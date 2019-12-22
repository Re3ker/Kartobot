const config = require('./config');
const Discord = require('discord.js');
const client = new Discord.Client();
const GphApiClient = require('giphy-js-sdk-core');
const gClient = GphApiClient(config.GIPHY_TOKEN);

// Commands
const Commands = require('./commands/Commands');

let prefix = '::';
global.playerGuilds = {};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // client.user.setActivity('::help');

  client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: '::help',
            type: "STREAMING",
            url: "https://www.twitch.tv/kartodev"
        }
    });
});

client.on('message', async message => {
  let { content, member, channel } = message;
  if (!content.startsWith(prefix) || member == null || channel.type == "dm" || member.user.bot) return;
  content = content.substring(prefix.length);

  let command = content.split(" ")[0];
  let args = content.split(" ").slice(1);

  switch (command) {

    // normal commands
    case "help":
      return Commands.help(prefix, message, command, args);
    case "gif":
      return Commands.gif(gClient, message, args);
    case "joke":
      return Commands.joke(message);
    case "activities":
      return Commands.activities(message);   
    case "stats":
      return message.channel.send(`Server count: ${client.guilds.size}`);
    
    // nsfw commands
    case "kona":
      return Commands.kona(message, args);

    // master commands
    case "leaveserver":
      return Commands.leaveServer(message);

    // player commands
    case "play": {
      return Commands.play(message, args);
    }
    case "leave": {
      return Commands.leave(message);
    }
  }
  
  return Commands.interaction(gClient, message, command, args);
});

client.login(config.DISCORD_TOKEN);
