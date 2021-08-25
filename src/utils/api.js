class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then(res => this._checkRequestResult(res))
      // .catch(error => this._errorHandler(error));
  }

  setUserInfo(personName, personAbout) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: personName,
        about: personAbout
      })
    })
      .then(res => this._checkRequestResult(res))
      // .catch(error => this._errorHandler(error));
  }

  setAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      })
    })
      .then(res => this._checkRequestResult(res))
      // .catch(error => this._errorHandler(error));
  }

  getInitalCardsList() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
      .then(res => this._checkRequestResult(res))
      // .catch(error => this._errorHandler(error));
  }

  sendCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._checkRequestResult(res))
      // .catch(error => this._errorHandler(error));
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers
    })
      .then(res => this._checkRequestResult(res))
      // .catch(error => this._errorHandler(error));
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => this._checkRequestResult(res))
      // .catch(error => this._errorHandler(error));
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => this._checkRequestResult(res))
      // .catch(error => this._errorHandler(error));
  }

  _checkRequestResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _errorHandler(error) {
    console.log(error);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '1a4ad76b-29b2-4dd1-8dcf-be36c0080f4b',
    'Content-Type': 'application/json'
  }
});
export default api;
