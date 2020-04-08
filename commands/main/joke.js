import Discord from 'discord.js';

let JokeCommand = async function(message) {
  let cfg = {
    headers: {
      'Accept': 'application/json',
    }
  }
  let result = await fetch('https://icanhazdadjoke.com/', cfg)
  .then(response => response.json() )
  .then(result => message.channel.send(result.joke));
};

export { JokeCommand };