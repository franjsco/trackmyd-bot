const config = require('./config');

function auth(userId) {
  return config.app.authorizedUsers.includes(userId);
}

module.exports = auth;
