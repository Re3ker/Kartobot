'use strict';
import fs from 'fs';
import Discord from 'discord.js';
import BotConfig from './config.js';
import { walk } from './libs/fileWalker.js';
import Keyv from 'keyv';

const client = new Discord.Client();
client.commands = new Discord.Collection();
global.prefixes = new Keyv(BotConfig.DB_CONNECTION);
global.prefix = BotConfig.PREFIX;

let files = walk('./commands', []);
for (const file of files) {
  import(`${file}`).then( (command) => {
    if(command.default.alias !== undefined){
      const alias_list = command.default.alias;
      for(let alias of alias_list){
        client.commands.set(alias, command.default);
      }
    }
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

  const command = args.shift().toLowerCase();
  
  client.commands.get(command).execute(message, args);
});

client.login(BotConfig.DISCORD_TOKEN);
