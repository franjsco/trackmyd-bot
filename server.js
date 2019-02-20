const Telebot = require('telebot');
const config = require('./config');
const utils = require('./utils');
const auth = require('./auth');
const api = require('./api');

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
        bot.sendMessage(msg.from.id, utils.templateDevicesList(elem));
      });
    })
    .catch((err) => {
      bot.sendMessage(msg.from.id, 'errore');
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
      bot.sendMessage(msg.from.id, 'Error1234');
    });
});

bot.on('ask.devicePosition', (msg) => {
  if (!auth(msg.from.id)) {
    return bot.sendMessage(msg.from.id, utils.templateUnauthorizedUser(), { parseMode: 'Markdown' });
  }

  api.getInfoDevice(msg.text)
    .then(res => res.json())
    .then((json) => {
      bot.sendLocation(msg.from.id, [json.position.latitude, json.position.longtitude]);
      bot.sendMessage(msg.from.id, utils.templatePosition(json));
    })
    .catch((err) => {
      bot.sendMessage(msg.from.id, err);
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
    .then(res => res.json())
    .then((json) => {
      bot.sendMessage(msg.from.id, JSON.stringify(json));
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
      bot.sendMessage(msg.from.id, 'Error');
    });
});

bot.start();
