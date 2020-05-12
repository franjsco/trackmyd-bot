const fetch = require('node-fetch');
const { api } = require('../config.json');
const logger = require('./logger');

const devicesPath = `${api.baseURL}${api.paths.devices}`;

function getDevicesAPI() {
  const init = {
    method: 'GET',
    headers: api.headers,
  };

  return fetch(devicesPath, init);
}

function getDevices() {
  return getDevicesAPI()
    .then((res) => {
      if (res.status === 404) {
        throw new Error('DevicesNotFound');
      } else if (!res.ok) {
        throw new Error(res);
      }

      return res.json();
    })
    .then(json => json)
    .catch((err) => {
      logger.logError(err);
      throw err;
    });
}


function getInfoDeviceAPI(name) {
  const init = {
    method: 'GET',
    headers: api.headers,
  };

  const path = `${devicesPath}?name=${name}`;
  return fetch(path, init);
}

function getInfoDevice(deviceId) {
  return getInfoDeviceAPI(deviceId)
    .then((res) => {
      if (res.status === 404) {
        throw new Error('DevicesNotFound');
      } else if (!res.ok) {
        throw new Error(res);
      }

      return res.json();
    })
    .then((json) => {
      if (!Object.prototype.hasOwnProperty.call(json, 'position')) {
        throw new Error('PositionNotFound');
      }
      return json;
    })
    .catch((err) => {
      logger.logError(err);
      throw err;
    });
}

function addDeviceAPI(name) {
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

function addDevice(name) {
  return addDeviceAPI(name)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res);
      }

      return res.json();
    })
    .then(json => json)
    .catch((err) => {
      logger.logError(err);
      throw err;
    });
}

function removeDeviceAPI(id) {
  const init = {
    method: 'DELETE',
    headers: api.headers,
  };

  const path = `${devicesPath}${id}`;
  return fetch(path, init);
}

function removeDevice(deviceId) {
  return removeDeviceAPI(deviceId)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res);
      }

      return res.status;
    })
    .then(json => json)
    .catch((err) => {
      logger.logError(err);
      throw err;
    });
}

module.exports.getDevices = getDevices;
module.exports.getInfoDevice = getInfoDevice;
module.exports.addDevice = addDevice;
module.exports.removeDevice = removeDevice;
