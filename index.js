const config = require('./config');
const Discord = require('discord.js');
const client = new Discord.Client();
const GphApiClient = require('giphy-js-sdk-core');
const gClient = GphApiClient(config.giphy_token);

let prefix = '::';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Prefix is ::');
});

client.on('message', message => {
  let {content} = message;
  if(!content.startsWith(prefix)) return;
  content = content.substring(prefix.length);
  
  let command = content.split(" ")[0];
  let args = content.split(" ").slice(1);
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!rMember) return;

  gClient.search('gifs', {'q': command, 'sort': 'relevant'})
  .then((response) => {
    let {data} = response;
    let gifObj = data[Math.floor(Math.random()*data.length)];

    let rich = new Discord.RichEmbed();
    rich.setTitle(`**${message.member.user.username}** did ${command} you, **${rMember.user.username}**`);
    rich.setColor(0x793fd1);
    rich.setImage(gifObj.images.original.url);
    message.channel.send(rich);
  })
  .catch((err) => {
    console.log(err);
  })
  
});

client.login(config.bot_token);