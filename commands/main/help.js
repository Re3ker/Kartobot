import Discord from 'discord.js';

let HelpCommand = function(prefix, message, command, args) {
  
  let rich = new Discord.RichEmbed();
  rich.setTitle(`**Here is a list of commands you can use**`);
  rich.setDescription(`
  **Main Commands:**
  **${prefix}help** returns this help dialog.
  **${prefix}gif [search]** gif me more!
  **${prefix}joke** random joke for you!
  **${prefix}activities** List of all activities/games played now by guild members.
  **${prefix}[action] [mention]** will do the action you specified to a given user you've mentioned.
  
  **NSFW Commands:**
  **${prefix}kona [search]** for da weebs!
  
  **Master Commands:**
  *Top Secret*`);
  rich.setColor(0x793fd1);
  message.channel.send(rich);
};

export { HelpCommand };