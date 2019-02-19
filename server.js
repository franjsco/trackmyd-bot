const Telebot = require('telebot');
const config = require('./config');
const utils = require('./utils');

const bot = new Telebot({
  token: config.app.tokenBot,
  usePlugins: ['askUser'],
});


bot.on('/start', (msg) => {
  bot.sendMessage(msg.from.id, utils.templateStart(), { parseMode: 'Markdown' });
  bot.event('/help', msg);
});

bot.on('/help', (msg) => {
  bot.sendMessage(msg.from.id, utils.templateHelp(), { parseMode: 'Markdown' });
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
