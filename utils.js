const config = require('./config');

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
  const msg = `📲 📡 ${data.name}
-------------------------------------
- 🏔️ Altitude: ${data.position.altitude}
- ⚡️ Speed: ${data.position.speed}
- 📏 Accurancy: ${data.position.accurancy}
- 🔋 Battery: ${data.information.battery}
- ⌚️ 2019-02-18T13:44:01`;

  return msg;
}

function templateDevicesList(data) {
  const msg = `📲 ${data.name}
  ${data._id}`;
  return msg;
}

module.exports.templateStart = templateStart;
module.exports.templateHelp = templateHelp;
module.exports.templateUnauthorizedUser = templateUnauthorizedUser;
module.exports.templatePosition = templatePosition;
module.exports.templateDevicesList = templateDevicesList;
