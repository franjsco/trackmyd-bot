const fetch = require('node-fetch');
const { api } = require('./config');

const devicesPath = `${api.baseURL}${api.paths.devices}`;

function getDevices() {
  const init = {
    method: 'GET',
    headers: api.headers,
  };

  return fetch(devicesPath, init);
}

function getInfoDevice(name) {
  const init = {
    method: 'GET',
    headers: api.headers,
  };

  const path = `${devicesPath}?name=${name}`;
  return fetch(path, init);
}

function addDevice(name) {
  const body = {
    name,
  };

  const init = {
    method: 'POST',
    headers: api.headers,
    body: JSON.stringify(body),
  };

  return fetch(devicesPath, init);
}

function removeDevice(id) {
  const init = {
    method: 'DELETE',
    headers: api.headers,
  };

  const path = `${devicesPath}${id}`;
  return fetch(path, init);
}


module.exports.getDevices = getDevices;
module.exports.getInfoDevice = getInfoDevice;
module.exports.addDevice = addDevice;
module.exports.removeDevice = removeDevice;
