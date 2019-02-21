/* eslint-disable no-console */
const bunyan = require('bunyan');
const config = require('./config.json');

const log = bunyan.createLogger({
  name: config.app.name,
  streams: [{
    level: 'info',
    path: config.logger.infoLogging.filename,
  }],
});

function logError(msg) {
  log.error(msg);
}

function logInfo(msg) {
  log.info(msg);
}

function logFatal(msg) {
  log.fatal(msg);
}

function logConsole(msg) {
  console.log(`(${config.app.name}): ${msg}`);
}

module.exports.logError = logError;
module.exports.logInfo = logInfo;
module.exports.logFatal = logFatal;
module.exports.logConsole = logConsole;
