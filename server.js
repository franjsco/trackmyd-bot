/* eslint-disable consistent-return */
const Telebot = require('telebot');
const config = require('./config');
const utils = require('./utils');
const auth = require('./auth');
const api = require('./api');
const logger = require('./logger');
const templates = require('./templates');

logger.logConsole('Server started');
logger.logInfo('Server started');

const bot = new Telebot({
  token: config.app.tokenBot,
  usePlugins: ['askUser'],
});

bot.on('/start', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, templates.unauthorizedUser(), { parseMode: 'Markdown' });
  }
  bot.sendMessage(msg.from.id, templates.welcome(), { parseMode: 'Markdown' });
  bot.event('/help', msg);
});

bot.on('/help', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, templates.unauthorizedUser(), { parseMode: 'Markdown' });
  }
  bot.sendMessage(msg.from.id, templates.help(), { parseMode: 'Markdown' });
});

bot.on('/list', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, templates.unauthorizedUser(), { parseMode: 'Markdown' });
  }

  api.getDevices()
    .then((res) => {
      res.forEach((elem) => {
        bot.sendMessage(msg.from.id, templates.deviceList(elem), { parseMode: 'Markdown' });
      });
    })
    .catch((err) => {
      utils.sendErrorMessage(err, msg);
    });
});

bot.on('/position', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, templates.unauthorizedUser(), { parseMode: 'Markdown' });
  }

  api.getDevices()
    .then((res) => {
      const devices = [];
      res.forEach((device) => {
        devices.push(device.name);
      });

      const replyMarkup = bot.keyboard([devices], { resize: true, once: true });
      bot.sendMessage(msg.from.id, 'Select device', { ask: 'devicePosition', replyMarkup });
    })
    .catch((err) => {
      utils.sendErrorMessage(err, msg);
    });
});

bot.on('ask.devicePosition', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, templates.unauthorizedUser(), { parseMode: 'Markdown' });
  }

  api.getInfoDevice(msg.text)
    .then((res) => {
      bot.sendLocation(msg.from.id, [res.position.latitude, res.position.longtitude]);
      bot.sendMessage(msg.from.id, templates.position(res), { parseMode: 'Markdown' });
    })
    .catch((err) => {
      utils.sendErrorMessage(err, msg);
    });
});

bot.on('/add', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, templates.unauthorizedUser(), { parseMode: 'Markdown' });
  }
  bot.sendMessage(msg.from.id, 'insert name', { ask: 'addDevice' });
});

bot.on('ask.addDevice', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, templates.unauthorizedUser(), { parseMode: 'Markdown' });
  }

  api.addDevice(msg.text)
    .then((res) => {
      bot.sendMessage(msg.from.id, templates.addDeviceURL(res));
      bot.sendMessage(msg.from.id, templates.addDeviceHeader());
      bot.sendMessage(msg.from.id, templates.addDeviceBody());
    })
    .catch((err) => {
      utils.sendErrorMessage(err, msg);
    });
});

bot.on('/remove', (msg) => {
  bot.sendMessage(msg.from.id, 'Insert Device ID', { ask: 'removeDevice' });
});

bot.on('ask.removeDevice', (msg) => {
  api.removeDevice(msg.text)
    .then((res) => {
      bot.sendMessage(msg.from.id, 'Device Removed');
    })
    .catch((err) => {
      utils.sendErrorMessage(err, msg);
    });
});

bot.start();

process.on('SIGINT', () => {
  logger.logInfo('Server stopped');
  logger.logConsole('Server stopped');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  logger.logError(err);
});
