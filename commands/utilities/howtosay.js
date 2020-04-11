import Discord from 'discord.js';
import https from 'https';
export default {
  name: 'howtosay',
  description: 'how to say a given word',
  category: 'utilities',
  alias: ['hts'],
  args: ['word'],
  async execute(message, args) {
    let processMsg = await message.channel.send(":orange_circle: Processing...").then(msg => msg);
    https.get(`https://howjsay.com/mp3/${args[0]}.mp3`, function(response) {
      if (response.headers['content-type'] !== 'audio/mpeg') {
        processMsg.edit(':red_circle: I cannot say that, I\'m sorry.');
      } else {
        processMsg.delete().catch(error => console.error);
        message.channel.send(new Discord.MessageAttachment(response, `${args[0]}.mp3`));
      }
    });
  }
}
