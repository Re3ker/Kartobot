module.exports = function(message){
  if(!message.member.roles.find(r => r.name === "DJ")){
    return message.reply("You don't have the permission to do that");
  }
  if(!message.member.voiceChannel){
    return message.reply("You need to be in a voice channel to do that.");
  }

  if(message.guild.voiceConnection){
    playerGuilds[message.guild.id] = {
      playlist: [],
      playing: false
    };
    return message.member.voiceChannel.leave();
  }

};