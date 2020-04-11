import Discord from 'discord.js';
import { BotConfig } from './../../config.js';


let HelpCommand = function(prefix, message) {
  
  let rich = new Discord.MessageEmbed();
  rich.setTitle(`**Here is a list of commands you can use**`);
  rich.setDescription(`
  **Main Commands:**
  **${prefix}help** returns THIS.
  **${prefix}joke** random joke for you!
  **${prefix}howtosay [word]** how to say a specific word.
  `);
  rich.setColor(BotConfig.BOT_COLOR);
  message.channel.send(rich);
};

export { HelpCommand };