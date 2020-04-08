'use strict';

import Discord from 'discord.js';
import { BotConfig } from './config.js';
import { HelpCommand } from './commands/main/help.js';
import { ActivitiesCommand } from './commands/main/activities.js';
import { JokeCommand } from './commands/main/joke.js';
// import { DongCommand } from './commands/main/dong.js';
import { CommandQueue } from './commands/CommandQueue.js';

const client = new Discord.Client();

let prefix = '::';
const commandQueue = new CommandQueue(5);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // client.user.setActivity('::help');
  client.user.setStatus('available');
});

client.on('message', async message => {
  let { content, member, channel } = message;
  if (!content.startsWith(prefix) || member == null || channel.type == "dm" || member.user.bot) return;
  content = content.substring(prefix.length);

  let command = content.split(" ")[0];
  let args = content.split(" ").slice(1);
  message.channel.send('got command, I\'m working fine!');
});

client.login(BotConfig.DISCORD_TOKEN);
