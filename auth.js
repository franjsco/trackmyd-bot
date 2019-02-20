const config = require('./config');

function checkUser(userId) {
  return config.app.authorizedUsers.includes(userId);
}

function auth(userId, okAuth, koAuth) {
  if (checkUser(userId)) {
    okAuth();
  } else {
    koAuth();
  }
}

module.exports = auth;
