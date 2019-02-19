const Telebot = require('telebot');
const config = require('./config');

const bot = new Telebot({
  token: config.app.tokenBot,
  usePlugins: ['askUser'],
});


bot.on('/start', (msg) => {
  const name = 'user';
  bot.sendMessage(msg.from.id, `hello ${name}`);
});


bot.start();
