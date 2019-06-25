const Discord = require('discord.js');

module.exports = function(gClient,message, args) {
  let search_text = args.join(' ');
  gClient.search('gifs', {'q': search_text, 'sort': 'relevant'})
  .then((response) => {
    if(response.pagination.count == 0) return message.channel.send(':no_entry: `Are you sure about that?`');
    let {data} = response;
    let gifObj = data[Math.floor(Math.random()*data.length)];

    let rich = new Discord.RichEmbed();
    rich.setColor(0x793fd1);
    rich.setImage(gifObj.images.original.url);
    message.channel.send(rich);
  })
  .catch((err) => {
    console.log(err);
    
  })
};