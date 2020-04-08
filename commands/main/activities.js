let ActivitiesCommand = async function(message) {
  let all_members = message.member.guild.members;
  let all_games = new Array();
  for (let member of all_members) {
    let user = message.guild.members.get(member[0]);
    let userGame = null;
    if (user.presence.game && !user.user.bot) {
      userGame = user.presence.game.name;
      if (all_games.indexOf(userGame) === -1 && userGame.trim() !== "") {
        all_games.push(userGame.trim());
      }
    }
  }
  all_games.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  let size = 0;
  let chunks = new Array();
  let max_chunk_size = 1800;
  let temp = new Array();
  for (let game in all_games) {

    size += all_games[game].length;

    if (size >= max_chunk_size) {
      size = 0;
      chunks.push(temp);
      temp = new Array();
    }

    temp.push(all_games[game]);

  }
  chunks.push(temp);

  if(chunks[0].length == 0) return message.channel.send(':no_entry: `No current activities/games found!`');

  for (let i = 0; i < chunks.length; i++) {
    let msg = `**List of all activities/games played by guild members now** (Page ${i+1})\n`;
    msg += '```\n';
    let list = chunks[i];
    for (let game of list) {
      msg += `${game}\n`;
    }
    msg += '```';
    message.channel.send(msg);
  }
};

export { ActivitiesCommand };