class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-Type': 'application/json',
      authorization: '05e45ebf-d4ff-4e41-8bcf-ab592cb66400',
    };
  };

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  };
  
  changeCardLikeState(cardId, like) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  };

  getCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  };

  addCard({name, link}) {
    const body = {
      name: name,
      link: link,
    };

    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    })
      .then((res) => this._getResponseData(res))
  };

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => this._getResponseData(res))
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET',
    })
      .then((res) => this._getResponseData(res))
  };

  editUserInfo({name, about}) {
    const body = {
      name: name,
      about: about,
    };

    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(body),
    })
      .then((res) => this._getResponseData(res))
    
  };

  editAvatar(avatarUrl) {
    const body = {
      avatar: avatarUrl
    };

    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(body),
    })
      .then((res) => this._getResponseData(res))
    
  };

};

export default new Api('https://mesto.nomoreparties.co/v1/cohort-43');