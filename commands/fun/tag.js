import Discord from 'discord.js';
import https from 'https';
export default {
  name: 'tag',
  description: 'just em tags',
  category: 'utilities',
  args: ['tagname', '?text'],
  async execute(message, args) {
    if(!args.length) return;
    let tagName = args[0].replace(/[^a-z0-9]/gi,'');
    global.tags.get(args[0])
    if(args.length == 1){

    }
  }
}
