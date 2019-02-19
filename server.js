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

bot.on('/help', (msg) => {
  bot.sendMessage(msg.from.id, 'help template');
});

bot.on('/list', (msg) => {
  bot.sendMessage(msg.from.id, 'list template');
});

bot.on('/position', (msg) => {
  bot.sendMessage(msg.from.id, 'position template');
});

bot.on('/add', (msg) => {
  bot.sendMessage(msg.from.id, 'add');
});

bot.on('/remove', (msg) => {
  bot.sendMessage(msg.from.id, 'remove');
});


bot.start();
