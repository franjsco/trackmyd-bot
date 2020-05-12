const config = require('../config.json');

function auth(userId) {
  return config.app.authorizedUsers.includes(userId);
}

module.exports = auth;
