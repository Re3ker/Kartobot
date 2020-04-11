import Discord from 'discord.js';
import BotConfig from './../../config.js';
export default {
  name: 'help',
  description: 'returns THIS',
  category: 'general',
  alias: ['h'],
  async execute(message, args) {
    let rich = new Discord.MessageEmbed();
    rich.setTitle(`**List of commands**`);
    let helpText = '';
    let commandNames = [];
    let lastCategory = '';
    let currentCategory = '';
    for(let item of global.commands){
      let command = item[1];
      if(commandNames.includes(command.name)) continue;
      currentCategory = command.category;
      if(currentCategory !== lastCategory){
        helpText += `\n**${currentCategory.toUpperCase()}**\n`;
      }
      let args = (command.args !== undefined ? command.args.map(arg => ` [${arg}]`):'');
      let aliases = (command.alias !== undefined ? ' Alias: ' + command.alias.map(alias => ` ${alias}`):'');
      helpText += `**${global.prefix}${command.name}${args}** ${command.description}.${aliases}\n`;
      commandNames.push(command.name);
      lastCategory = currentCategory;
    }

    rich.setDescription(helpText);
    rich.setColor(BotConfig.BOT_COLOR);
    message.channel.send(rich);
  }
}
