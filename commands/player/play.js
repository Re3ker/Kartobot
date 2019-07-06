const YTDL = require('ytdl-core');

module.exports = function(message, args){
  if(message.member.voiceChannel){

    if(!playerGuilds[message.guild.id]){
      playerGuilds[message.guild.id] = {
        playlist: [],
        playing: false
      };
    }

    if(!message.guild.voiceConnection){
      message.member.voiceChannel.join().then(connection => {
        playerGuilds[message.guild.id].playlist.push(args[0]);
        playerGuilds[message.guild.id].connection = connection;
        if(!playerGuilds[message.guild.id].playing){
          PlayAudio(connection, message);
        }
      });
    }else{
      playerGuilds[message.guild.id].playlist.push(args[0]);
      if(!playerGuilds[message.guild.id].playing && playerGuilds[message.guild.id].connection){
        PlayAudio(playerGuilds[message.guild.id].connection, message);
      }
    }
    
    
  }

  return "";
};

function PlayAudio(connection, message){
  let guild = playerGuilds[message.guild.id];
  guild.dispatcher = connection.playStream(YTDL(guild.playlist[0], {filter: 'audioonly'}));
  guild.playlist.shift();
  guild.playing = true;
  guild.dispatcher.on('end', function(){
    if(guild.playlist[0]){
      PlayAudio(connection, message);
    }else{
      guild.playing = false;
      connection.disconnect();
    }
  });
}