class Auth {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-Type': 'application/json',
    };
  };

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  };

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    })
    .then(this._getResponseData)
  };

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    })
    .then(this._getResponseData)
  };
  
  tokenValidation(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(this._getResponseData)
  };

};

export default new Auth("http://localhost:4000");