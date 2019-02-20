const Telebot = require('telebot');
const config = require('./config');
const utils = require('./utils');
const auth = require('./auth');

const bot = new Telebot({
  token: config.app.tokenBot,
  usePlugins: ['askUser'],
});

bot.on('/*', (msg) => {
  bot.sendMessage(msg.from.id, 'qualsiasi');
});

bot.on('/start', (msg) => {
  auth(msg.from.id, () => {
    bot.sendMessage(msg.from.id, utils.templateStart(), { parseMode: 'Markdown' });
    bot.event('/help', msg);
  },
  () => bot.sendMessage(msg.from.id, utils.templateUnauthorizedUser(), { parseMode: 'Markdown' }));
});

bot.on('/help', (msg) => {
  auth(msg.from.id, () => {
    bot.sendMessage(msg.from.id, utils.templateHelp(), { parseMode: 'Markdown' });
  });
});

bot.on('/list', (msg) => {
  auth(msg.from.id, () => {
    bot.sendMessage(msg.from.id, 'list template');
  });
});

bot.on('/position', (msg) => {
  auth(msg.from.id, () => {
    bot.sendMessage(msg.from.id, 'position template');
  });
});

bot.on('/add', (msg) => {
  auth(msg.from.id, () => {
    bot.sendMessage(msg.from.id, 'add');
  });
});

bot.on('/remove', (msg) => {
  auth(msg.from.id, () => {
    bot.sendMessage(msg.from.id, 'remove');
  });
});


bot.start();
