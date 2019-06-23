const Discord = require('discord.js');

module.exports.run = function(gClient,message, command, args) {
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rMember) return message.channel.send(':no_entry: `Invalid member!`');
  gClient.search('gifs', {'q': command, 'sort': 'relevant'})
  .then((response) => {
    if(response.pagination.count == 0) return message.channel.send(':no_entry: `Are you sure about that?`');;
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
};