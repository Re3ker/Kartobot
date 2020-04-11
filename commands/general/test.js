export default {
  name: 'test',
  description: 'returns THIS',
  async execute(message, args) {
    message.channel.send('test');
  }
}
