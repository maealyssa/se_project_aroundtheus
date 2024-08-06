export default class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    getInitialCards() {
        return this._request(`${this._url}/cards`, {
            headers: this._headers,
        });
    }
      
    fetchUserInfo() {
        return this._request(`${this._url}/users/me`, {
            headers: this._headers,
        });
    }

    editProfile({ name, description }) {
        return this._request(`${this._url}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            about: description,
          }),
        });
      }

    editProfileAvatar({ link }) {
        return this._request(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ 
                avatar: link,
            }),
        });
    }

    addNewCard({ cardName, cardLink }) {
        return this._request(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ 
                name: cardName, 
                link: cardLink,
            }),
        });
    }

    deleteCard(cardId) {
        return this._request(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    addLike(cardId) {
        return this._request(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    deleteLike(cardId) {
        return this._request(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        });
    }
  }