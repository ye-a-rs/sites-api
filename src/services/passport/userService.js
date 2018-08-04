const fetch = require('node-fetch');
const config = require('../../config');

const loginStatus = {
  success: 0,
  fail: 1
}

const getInfoStatus = {
  success: 0,
  fail: 1
}

module.exports = {
  async loginByPhone(phone, password) {
    const res = await fetch(`${config.passportServiceUrl}/api/user/loginByPhone`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone,
        password
      })
    });
    if (res.status !== 200) {
      throw res.status;
    } else {
      const result = await res.json();
      if (result.code === loginStatus.success) {
        return result.data;
      } else {
        return false;
      }
    }
  },
  async loginByEmail(email, password) {
    const res = await fetch(`${config.passportServiceUrl}/api/user/loginByEmail`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    if (res.status !== 200) {
      throw res.status;
    } else {
      const result = await res.json();
      if (result.code === loginStatus.success) {
        return result.data;
      } else {
        return false;
      }
    }
  },
  async loginByUsername(username, password) {
    const res = await fetch(`${config.passportServiceUrl}/api/user/loginByUsername`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    if (res.status !== 200) {
      throw res.status;
    } else {
      const result = await res.json();
      if (result.code === loginStatus.success) {
        return result.data;
      } else {
        return false;
      }
    }
  },
  async getInfo(token) {
    const res = await fetch(`${config.passportServiceUrl}/api/user/getInfo`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token
      })
    });
    if (res.status !== 200) {
      throw res.status;
    } else {
      const result = await res.json();
      if (result.code === getInfoStatus.success) {
        return result.data;
      } else {
        return false;
      }
    }
  }
}