'use strict';
import Discord from 'discord.js';
import BotConfig from './config.js';
import { walk } from './libs/fileWalker.js';
import Keyv from 'keyv';
import KNEX from 'knex';

const client = new Discord.Client();
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
global.prefixes = new Keyv(BotConfig.DB_CONNECTION, { namespace: 'prefixes' });
global.prefix = BotConfig.PREFIX;
global.tags = new Keyv(BotConfig.DB_CONNECTION, { namespace: 'tags' });

global.knex = new KNEX({
  client: 'mysql',
  connection: {
    host: BotConfig.DB_HOST,
    user: BotConfig.DB_USER,
    password: BotConfig.DB_PASS,
    database: BotConfig.DB_DATABASE
  }
});

let files = walk('./commands', []);
for (const file of files) {
  import(`${file}`).then( (command) => {
    client.commands.set(command.default.name, command.default);
  });
}

client.on('ready', async () => {
  client.user.setActivity(`${global.prefix}help`);
  client.user.setStatus('available');
  console.log(`Logged in as ${client.user.tag}!`);
  global.commands = client.commands;
  global.commands.sort((a, b) => {
    if(a.category < b.category){
      return -1;
    }else if(a.category > b.category){
      return 1;
    }
    return 0;
  });
});

client.on('message', async message => {
  if (message.member == null || message.channel.type == "dm" || message.member.user.bot) return;

  let { content, member, channel } = message;
  let args;
	if (message.guild) {
		let prefix;

		if (message.content.startsWith(global.prefix)) {
			prefix = global.prefix;
		} else {
			const guildPrefix = await global.prefixes.get(message.guild.id);
			if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
		}

		if (!prefix) return;
		args = message.content.slice(prefix.length).split(/\s+/);
	} else {
		const slice = message.content.startsWith(global.prefix) ? global.prefix.length : 0;
		args = message.content.slice(slice).split(/\s+/);
	}

  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s).`);
    }
  }
  

  try {
    command.execute(message, args);
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  } catch (error) {
    console.log(error);
  }
});

client.login(BotConfig.DISCORD_TOKEN);
