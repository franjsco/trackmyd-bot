/* eslint-disable no-underscore-dangle */
const config = require('./config');
const utils = require('./utils');


function welcome() {
  const msg = `* Welcome to ${config.app.name} 📱📡*\n 
A bot to track your devices with GPS.

Please, read the README on 
https://github.com/frab1t/trackmyd-bot
to configure the bot.

Made with ❤️ by @frab1t`;
  return msg;
}

function help() {
  const msg = `📃 * ${config.app.name} commands*: \n
  /help - view commands.
  /position - view device's position.
  /list - view device available.
  /add - add new device.
  /remove - remove device.`;
  return msg;
}


function unauthorizedUser() {
  const msg = `Unauthorized user. 🤖  \n
Clone the repository https://github.com/frab1t/trackmyd-bot 
and run the bot on your local network. 😎`;
  return msg;
}

function deviceList(data) {
  const msg = `📲 *${data.name}*
  ----
  ${data._id}`;
  return msg;
}

function position(data) {
  const msg = `📲 📡 *${data.name}*

  🏔️ _Altitude_: *${Math.trunc(data.position.altitude)} m*
  ⚡️ _Speed_: *${data.position.speed} m/s*
  📏 _Accurancy_: *${Math.trunc(data.position.accurancy)} m*
  🔋 _Battery_: *${data.information.battery}%*

_Last Update_: ${utils.convertTimestamp(data.lastUpdate)}`;

  return msg;
}

function addDeviceURL(data) {
  const msg = `${config.api.baseURL}${config.api.paths.devices}${data._id}`;
  return msg;
}

function addDeviceHeader() {
  const head = config.api.headers;
  const msg = `Authorization: ${head.Authorization} \nContent-Type: ${head['Content-Type']}`;
  return msg;
}

function addDeviceBody() {
  const msg = `{
    "position": {
      "latitude": %LAT,
      "longtitude": %LON,
      "altitude": %ALT,
      "speed": %SPD,
      "accurancy": %ACC
    },
    "information": {
      "battery": %BATT
    },
    "lastUpdate": %TIMESTAMP
  }`;

  return msg;
}

function error() {
  const msg = 'Error, check the server.log';
  return msg;
}

function devicesNotFound(data) {
  let msg;
  if (data) {
    msg = `Device _"${data}"_ not found`;
  } else {
    msg = 'Devices not found';
  }
  return msg;
}

module.exports.unauthorizedUser = unauthorizedUser;
module.exports.welcome = welcome;
module.exports.help = help;
module.exports.deviceList = deviceList;
module.exports.position = position;
module.exports.addDeviceURL = addDeviceURL;
module.exports.addDeviceHeader = addDeviceHeader;
module.exports.addDeviceBody = addDeviceBody;
module.exports.error = error;
module.exports.devicesNotFound = devicesNotFound;
