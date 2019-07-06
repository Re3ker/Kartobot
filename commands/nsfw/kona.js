const Swagger = require('swagger-client');
const { RichEmbed } = require('discord.js');

module.exports = function(message, args) {
  let search_text = 'all';
  if (args !== undefined) {
    search_text = args.join(' ')
  }
  if (message.channel.nsfw === false) return message.channel.send(":no_entry: `This command can only be used in NSFW channels`");

  let url = "https://konachan.com/post?tags=order%3Arandom";
  if (search_text.trim() !== '') {
    url = `https://konachan.com/post?tags=order%3Arandom+${search_text.toLowerCase()}`;
  }
  const request = {
    url: url
  }

  Swagger.http(request)
    .then((res) => {
      let result = res.text;
      let pattern = /<a class="directlink [large|small]\w+" href="([^"]*)">/mgi;
      let matches = result.match(pattern);
      if (matches === null) {
        message.channel.send(":warning: `Nothing to see here...`");
        return;
      }
      let item = matches[Math.floor(Math.random() * matches.length)];
      let href = item.match(/href="([^"]*)/)[1];

      let embed = new RichEmbed()
        .setColor(0x793fd1)
        .setImage(href)
      message.channel.send(embed);

    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
    });
};
