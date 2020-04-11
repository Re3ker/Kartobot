import fetch from 'node-fetch';
export default {
  name: 'joke',
  description: 'random dad joke',
  category: 'fun',
  async execute(message, args) {
    let processMsg = await message.channel.send(":orange_circle: Loading...").then(msg => msg);
    let cfg = {
      headers: {
        'Accept': 'application/json',
      }
    }
    let result = await fetch('https://icanhazdadjoke.com/', cfg)
      .then(response => response.json())
      .then(result => {
        // message.channel.send(result.joke);
        processMsg.edit(`:green_circle: ${result.joke}`);
      });
  }
}
