const config = require('./config');
const Discord = require('discord.js');
const client = new Discord.Client();
const GphApiClient = require('giphy-js-sdk-core');
const gClient = GphApiClient(process.env.GIPHY_TOKEN);
// const gClient = GphApiClient(config.giphy_token);

// Commands
const Commands = require('./commands/Commands');

let prefix = '::';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('::help');
});

client.on('message', message => {
  let { content } = message;
  if (!content.startsWith(prefix) || message.member == null || message.channel.type == "dm" || message.member.user.bot) return;
  content = content.substring(prefix.length);

  let command = content.split(" ")[0];
  let args = content.split(" ").slice(1);

  switch (command) {
    case "help":
      return Commands.helpCommand(prefix, message, command, args);
    case "gif":
      return Commands.gifCommand(gClient, message, args);
    case "activities":
      return Commands.activitiesCommand(message);
    default:
      return Commands.interactionCommand(gClient, message, command, args);
  }

});

client.login(process.env.DISCORD_TOKEN);
// client.login(config.bot_token);
