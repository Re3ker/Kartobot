import erps from './../../json/erp_texts.js';
export default {
  name: 'erp',
  description: 'hmmm',
  category: 'nsfw',
  async execute(message, args){
    if(!message.channel.nsfw) return message.channel.send('We cannot do that here, we have to go into a NSFW channel, honey x3');
    let text = erps.sentences[Math.floor(Math.random() * erps.sentences.length)].text;
    message.channel.send(`*${text}*`);
  }
}