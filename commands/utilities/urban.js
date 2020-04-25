import Discord from 'discord.js';
import fetch from 'node-fetch';
import BotConfig from './../../config.js';
export default {
  name: 'urban',
  description: 'urban dictionary definition',
  category: 'utilities',
  aliases: ['urb'],
  args: ['search'],
  async execute(message, args) {
    if(!args.length) return message.channel.send('Search string missing!')
    let processMsg = await message.channel.send(":orange_circle: Processing...").then(msg => msg);
    let cfg = {
      headers: {
        'Accept': 'application/json',
      }
    }

    const { list } =  await fetch(`https://api.urbandictionary.com/v0/define?term=${args.join('+')}`, cfg).then(response => response.json());
    if (!list.length) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }
    const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
    const [answer] = list;
    const embed = new Discord.MessageEmbed()
			.setColor(BotConfig.BOT_COLOR)
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) },
				{ name: 'Rating', value: `${answer.thumbs_up} :thumbsup:. ${answer.thumbs_down} :thumbsdown:.` },
			);
		message.channel.send(embed).then(WTF => processMsg.delete().catch(error => console.error));
  }
}
