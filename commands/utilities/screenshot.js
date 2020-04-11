import Discord from 'discord.js';
import puppeteer from 'puppeteer';
export default {
  name: 'screenshot',
  description: 'takes screenshot of given website',
  category: 'utilities',
  aliases: ['ss'],
  args: ['url'],
  cooldown: 10,
  async execute(message, args) {
    let processMsg = await message.channel.send(":orange_circle: Processing...").then(msg => msg);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(args[0]).catch(error => {
      console.log(error);
      processMsg.delete().catch(error => console.error);
    });
    await page.screenshot().then(image => {
      message.channel.send(new Discord.MessageAttachment(image, `screenshot.png`));
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
