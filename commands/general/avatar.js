import Discord from 'discord.js';
import BotConfig from './../../config.js';
export default {
  name: 'avatar',
  description: 'get avatar from a user',
  category: 'general',
  aliases: ['pfp'],
  args: ['?mention'],
  async execute(message, args) {
    let processMsg = await message.channel.send(":orange_circle: Processing...").then(msg => msg);

    let avatarURL = '';
    let avatarUser = '';
    if (!message.mentions.users.size) {
      avatarURL = message.author.avatarURL({ dynamic: true, size: 512 });
      avatarUser = `${message.author.tag}`;
    } else {
      avatarURL = message.mentions.users.first().avatarURL({ dynamic: true, size: 512 });
      avatarUser = `${message.mentions.users.first().tag}`;
    }
    let avatarEmbed = new Discord.MessageEmbed()
      .setColor(BotConfig.BOT_COLOR)
      .setTitle(`Avatar of ${avatarUser}`)
      .setURL(avatarURL)
      .setImage(avatarURL)
      .setTimestamp()
    message.channel.send(avatarEmbed).then(msg => processMsg.delete().catch(error => console.error));

  },

}
