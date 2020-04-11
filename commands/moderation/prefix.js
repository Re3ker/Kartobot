import Discord from 'discord.js';
import BotConfig from './../../config.js';
export default {
  name: 'prefix',
  description: 'get or change prefix',
  category: 'moderation',
  args: ['?prefix'],
  async execute(message, args) {
    if (args.length) {
      if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(':no_entry: Missing Permission ADMINISTRATOR');
			await global.prefixes.set(message.guild.id, args[0]);
			return message.channel.send(`Successfully set prefix to \`${args[0]}\``);
		}

		return message.channel.send(`Prefix is \`${await global.prefixes.get(message.guild.id) || global.prefix}\``);
  }
}
