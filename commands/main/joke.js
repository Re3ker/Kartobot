import fetch from 'node-fetch';

let JokeCommand = async function(message) {
  let processMsg = await message.channel.send(":orange_circle: Loading...").then(msg => msg);
  let cfg = {
    headers: {
      'Accept': 'application/json',
    }
  }
  let result = await fetch('https://icanhazdadjoke.com/', cfg)
  .then(response => response.json() )
  .then(result => {
    // message.channel.send(result.joke);
    processMsg.edit(`:green_circle: ${result.joke}`);
  });
};

export { JokeCommand };