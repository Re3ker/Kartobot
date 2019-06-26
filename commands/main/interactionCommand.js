const Discord = require('discord.js');
const Tensify = require('tensify');

module.exports = function(gClient,message, command, args) {
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rMember) return message.channel.send(':no_entry: `Invalid member!`');
  gClient.search('gifs', {'q': command, 'sort': 'relevant'})
  .then((response) => {
    console.log(response);
    if(response.data.length == 0 || response.pagination.count == 0) return message.channel.send(':no_entry: `Are you sure about that?`');;
    let {data} = response;
    let gifObj = data[Math.floor(Math.random()*data.length)];

    let action_message = `Not sure what **${command}** is, but you might like it, **${rMember.user.username}**`;

    try {
      action_message = `**${rMember.user.username}** you have been ${Tensify(command).past} by **${message.member.user.username}**`
    } catch (error) {
      console.log(error);
    }

    let rich = new Discord.RichEmbed();
    rich.setTitle(action_message);
    rich.setColor(0x793fd1);
    rich.setImage(gifObj.images.original.url);
    message.channel.send(rich);
  })
  .catch((err) => {
    console.log(err);
  })
};