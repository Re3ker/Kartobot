const Discord = require('discord.js');

module.exports.run = function(message) {
  if(message.member.id !== '90578600432013312') return;
  message.channel.send('Good Bye!');
  message.guild.leave()
  .then(g => console.log(`Left the guild ${g}`))
  .catch(console.error);
};