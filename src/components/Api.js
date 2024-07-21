export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
  
    _response = (res) => {
        if(res.ok) {
            return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
    }

    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
          });
          return this._response(res);
    }
      
    async getUserInfo() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
        return this._response(res);
    }

    async editProfile({ name, about }) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, about }),
        });
        return this._response(res);
    }

    async editProfileAvatar({ link }) {
        const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: link }),
        });
        return this._response(res);
    }

    async getAllCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        });
        return this._response(res);
    }

    async addNewCard({ name, link }) {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link }),
        });
        return this._response(res);
    }

    async deleteCard({ cardId }) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
        return this._response(res);
    }

    async addLike({ cardId }) {
        const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        });
        return this._response(res);
    }

    async deleteLike({ cardId }) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        });
        return this._response(res);
    }
  }