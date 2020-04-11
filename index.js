'use strict';
import fs from 'fs';
import Discord from 'discord.js';
import BotConfig from './config.js';

const client = new Discord.Client();
client.commands = new Discord.Collection();
global.prefix = ';';

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  import(`./commands/${file}`).then( (command) => {
    console.log(command.default);
    client.commands.set(command.default.name, command.default);
  });
}

client.on('ready', async () => {
  client.user.setActivity(`${global.prefix}help`);
  client.user.setStatus('available');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  let { content, member, channel } = message;
  if (!content.startsWith(global.prefix) || member == null || channel.type == "dm" || member.user.bot) return;
  content = content.substring(global.prefix.length);
  let command = content.split(" ")[0];
  let args = content.split(" ").slice(1);
  
  if (!client.commands.has(command)) return message.channel.send('command not found');
  client.commands.get(command).execute(message, args);
});

client.login(BotConfig.DISCORD_TOKEN);
