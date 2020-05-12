const templates = require('./templates');

function sendErrorMessage(error, msgBot) {
  switch (error.message) {
    case 'DevicesNotFound':
      msgBot.reply.text(templates.devicesNotFound());
      break;
    case 'DeviceNotFound':
      msgBot.reply.text(templates.devicesNotFound(msgBot.text));
      break;
    case 'PositionNotFound':
      msgBot.reply.text(templates.positionNotFound());
      break;
    default:
      msgBot.reply.text(templates.error());
  }
}

function convertTimestamp(timestamp) {
  return new Date(timestamp * 1000).toISOString().slice(0, 19);
}

module.exports.convertTimestamp = convertTimestamp;
module.exports.sendErrorMessage = sendErrorMessage;
