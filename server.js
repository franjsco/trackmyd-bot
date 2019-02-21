const Telebot = require('telebot');
const config = require('./config');
const utils = require('./utils');
const auth = require('./auth');
const api = require('./api');
const logger = require('./logger');

logger.logConsole('Server started');
logger.logInfo('Server started');

const bot = new Telebot({
  token: config.app.tokenBot,
  usePlugins: ['askUser'],
});

bot.on('/start', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, utils.templateUnauthorizedUser(), { parseMode: 'Markdown' });
  }
  bot.sendMessage(msg.from.id, utils.templateStart(), { parseMode: 'Markdown' });
  bot.event('/help', msg);
});

bot.on('/help', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, utils.templateUnauthorizedUser(), { parseMode: 'Markdown' });
  }
  bot.sendMessage(msg.from.id, utils.templateHelp(), { parseMode: 'Markdown' });
});

bot.on('/list', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, utils.templateUnauthorizedUser(), { parseMode: 'Markdown' });
  }

  api.getDevices()
    .then(res => res.json())
    .then((json) => {
      json.forEach((elem) => {
        bot.sendMessage(msg.from.id, utils.templateDevicesList(elem), { parseMode: 'Markdown' });
      });
    })
    .catch((err) => {
      bot.sendMessage(msg.from.id, utils.templateError());
      logger.logError(err);
    });
});

bot.on('/position', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, utils.templateUnauthorizedUser(), { parseMode: 'Markdown' });
  }

  api.getDevices()
    .then(res => res.json())
    .then((devicesJSON) => {
      const devices = [];
      devicesJSON.forEach((device) => {
        devices.push(device.name);
      });

      const replyMarkup = bot.keyboard([devices], { resize: true, once: true });
      bot.sendMessage(msg.from.id, 'Select device', { ask: 'devicePosition', replyMarkup });
    })
    .catch((err) => {
      bot.sendMessage(msg.from.id, utils.templateError());
      logger.logError(err);
    });
});

bot.on('ask.devicePosition', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, utils.templateUnauthorizedUser(), { parseMode: 'Markdown' });
  }

  api.getInfoDevice(msg.text)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return null;
    })
    .then((json) => {
      if (json) {
        bot.sendLocation(msg.from.id, [json.position.latitude, json.position.longtitude]);
        bot.sendMessage(msg.from.id, utils.templatePosition(json), { parseMode: 'Markdown' });
      } else {
        bot.sendMessage(msg.from.id, utils.templateDeviceNotFound(msg.text), { parseMode: 'Markdown' });
      }
    })
    .catch((err) => {
      bot.sendMessage(msg.from.id, utils.templateError());
      logger.logError(err);
    });
});

bot.on('/add', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, utils.templateUnauthorizedUser(), { parseMode: 'Markdown' });
  }
  bot.sendMessage(msg.from.id, 'insert name', { ask: 'addDevice' });
});

bot.on('ask.addDevice', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, utils.templateUnauthorizedUser(), { parseMode: 'Markdown' });
  }
  api.addDevice(msg.text)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return null;
    })
    .then((json) => {
      bot.sendMessage(msg.from.id, utils.templateAddDeviceURL(json));
      bot.sendMessage(msg.from.id, utils.templateAddDeviceHeader());
      bot.sendMessage(msg.from.id, utils.templateAddDeviceBody());
    })
    .catch((err) => { 
      bot.sendMessage(msg.from.id, utils.templateError());
      logger.logError(err);
    });
});

bot.on('/remove', (msg) => {
  bot.sendMessage(msg.from.id, 'Insert Device ID', { ask: 'removeDevice' });
});

bot.on('ask.removeDevice', (msg) => {
  api.removeDevice(msg.text)
    .then((res) => {
      bot.sendMessage(msg.from.id, 'Device Deleted');
    })
    .catch((err) => {
      bot.sendMessage(msg.from.id, utils.templateError());
      logger.logError(err);
    });
});

bot.start();

process.on('uncaughtException', (err) => {
  logger.logError(err);
});

process.on('SIGINT', () => {
  logger.logInfo('Server stopped');
  logger.logConsole('Server stopped');
  process.exit(0);
});
