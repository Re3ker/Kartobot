const Discord = require('discord.js');
const Dongs = require('../../json/dongs.json');

module.exports = function(message) {
  
  let dong = Dongs.dongs[Math.floor(Math.random() * Dongs.dongs.length)];
  let rich = new Discord.RichEmbed();
  rich.setTitle(`**D.O.N.G**`);
  rich.setDescription(`Hey Vsauce!
  Let's see what you can **D**o **O**nline **N**ow **G**uys...

  **${dong.title}**
  ${dong.url}`);
  rich.setColor(0x793fd1);
  message.channel.send(rich);
};