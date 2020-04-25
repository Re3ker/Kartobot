import Discord from 'discord.js';
import puppeteer from 'puppeteer';
import BotConfig from './../../config.js';
export default {
  name: 'screenshot',
  description: 'takes screenshot of given website',
  category: 'utilities',
  aliases: ['ss'],
  args: ['url'],
  cooldown: 10,
  async execute(message, args) {
    if(!args.length) return;
    let processMsg = await message.channel.send(":orange_circle: Processing...").then(msg => msg);
    let URL = args[0];
    if (!URL.match(/^[a-zA-Z]+:\/\//)){
      URL = 'https://' + URL;
    }
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {width: 1920, height: 1080},
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const page = await browser.newPage();
    await page.goto(URL).catch(error => {
      console.log(error);
      processMsg.delete().catch(error => console.error);
    });
    await page.screenshot({waitUntil: 'networkidle2', timeout: 10000}).then(image => {
      message.channel.send(new Discord.MessageAttachment(image, `screenshot.png`))
                      .then(msg => processMsg.delete().catch(error => console.error));
      processMsg.delete().catch(error => console.error);
      
      browser.close();
    }).catch(error => {
      console.log(error);
      processMsg.delete().catch(error => console.error);
    });

    

    // let avatarEmbed = new Discord.MessageEmbed()
    //   .setColor(BotConfig.BOT_COLOR)
    //   .setTitle(`Avatar of ${avatarUser}`)
    //   .setURL(avatarURL)
    //   .setImage(avatarURL)
    //   .setTimestamp()
    // message.channel.send(avatarEmbed).then(msg => processMsg.delete().catch(error => console.error));
  }
}
