export default {
  name: 'ping',
  description: 'pong!',
  async execute(message, args){
    message.channel.send("Pong! `" + `${Date.now() - message.createdTimestamp}` + " ms`");
  }
}