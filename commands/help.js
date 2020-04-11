import Discord from 'discord.js';
import BotConfig from './../config.js';
export default {
  name: 'help',
  description: 'returns THIS',
  async execute(message, args) {
    let rich = new Discord.MessageEmbed();
    rich.setTitle(`**Here is a list of commands you can use**`);
    rich.setDescription(`
    **Main Commands:**
    **${global.prefix}help** returns THIS.
    **${global.prefix}ping** pong.
    **${global.prefix}joke** random joke for you!
    **${global.prefix}howtosay [word]** how to say a specific word.

    **NSFW Commands:**
    **${global.prefix}erp** hmmmmmm.
    `);
    rich.setColor(BotConfig.BOT_COLOR);
    message.channel.send(rich);
  }
}
