const config = require('./config');

// utils functions
function convertTimestamp(timestamp) {
  return new Date(timestamp * 1000).toISOString().slice(0, 19);
}

// template
function templateStart() {
  const msg = `* Welcome to ${config.app.name} 📱📡*\n 
A bot to track your devices with GPS.

Please, read the README on 
https://github.com/frab1t/trackmyd-bot
to configure the bot.

Made with ❤️ by @frab1t`;
  return msg;
}

function templateHelp() {
  const msg = `📃 * ${config.app.name} commands*: \n
  /help - view commands.
  /position - view device's position.
  /list - view device available.
  /add - add new device.
  /remove - remove device.`;
  return msg;
}

function templateUnauthorizedUser() {
  const msg = `Unauthorized user. 🤖  \n
Clone the repository https://github.com/frab1t/trackmyd-bot 
and run the bot on your local network. 😎`;
  return msg;
}

function templatePosition(data) {
  const msg = `📲 📡 *${data.name}*

  🏔️ _Altitude_: *${Math.trunc(data.position.altitude)} m*
  ⚡️ _Speed_: *${data.position.speed} m/s*
  📏 _Accurancy_: *${Math.trunc(data.position.accurancy)} m*
  🔋 _Battery_: *${data.information.battery}%*

_Last Update_: ${convertTimestamp(data.lastUpdate)}`;

  return msg;
}

function templateDevicesList(data) {
  const msg = `📲 *${data.name}*
  ----
  ${data._id}`;
  return msg;
}

function templateError(data) {
  const msg = 'Error, check the server.log';
  return msg;
}

function templateDeviceNotFound(data) {
  let msg;
  if (data) {
    msg = `Device _"${data}"_ not found`;
  } else {
    msg = 'Devices not found';
  }
  return msg;
}

function templateAddDeviceURL(data) {
  const msg = `${config.api.baseURL}${config.api.paths.devices}${data._id}`;
  return msg;
}

function templateAddDeviceHeader() {
  const head = config.api.headers;
  const msg = `Authorization: ${head.Authorization} \nContent-Type: ${head['Content-Type']}`;
  return msg;
}

function templateAddDeviceBody() {
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

module.exports.templateStart = templateStart;
module.exports.templateHelp = templateHelp;
module.exports.templateUnauthorizedUser = templateUnauthorizedUser;
module.exports.templatePosition = templatePosition;
module.exports.templateDevicesList = templateDevicesList;
module.exports.templateError = templateError;
module.exports.templateDeviceNotFound = templateDeviceNotFound;
module.exports.templateAddDeviceURL = templateAddDeviceURL;
module.exports.templateAddDeviceHeader = templateAddDeviceHeader;
module.exports.templateAddDeviceBody = templateAddDeviceBody;