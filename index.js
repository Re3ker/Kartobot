'use strict';

import Discord from 'discord.js';
import { BotConfig } from './config.js';
import { HelpCommand } from './commands/main/help.js';
import { JokeCommand } from './commands/main/joke.js';
import { HowToSayCommand } from './commands/main/howtosay.js';

const client = new Discord.Client();
const prefix = ';';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(prefix+'help');
  client.user.setStatus('available');
});

client.on('message', async message => {
  let { content, member, channel } = message;
  if (!content.startsWith(prefix) || member == null || channel.type == "dm" || member.user.bot) return;
  content = content.substring(prefix.length);
  let command = content.split(" ")[0];
  let args = content.split(" ").slice(1);
  
  switch(command){
    case "help":{
      return HelpCommand(prefix, message);
    }
    case "joke":{
      return JokeCommand(message);
    }
    case "howtosay":{
      return HowToSayCommand(message, args);
    }
  }
});

client.login(BotConfig.DISCORD_TOKEN);
