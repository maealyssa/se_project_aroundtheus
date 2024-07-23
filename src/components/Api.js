export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            })
            .then((res) => {
                res.ok 
                    ? res.json()
                    : Promise.reject("An error has occurred", res.status)
            })
            .then((res) => {return res})
            .catch((err) => {
                console.error(err)
            });

    }
      
    fetchUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
        .then((res) => {
            res.ok 
                ? res.json()
                : Promise.reject("An error has occurred", res.status)
        })
        .then((res) => {return res})
        .catch((err) => {
            console.error(err)
        })

    }

    editProfile({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ 
                name: name, 
                about: about 
            }),
        });
    }

    editProfileAvatar({ link }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: link }),
        })
        .then((res) => {
            res.ok 
                ? res.json()
                : Promise.reject("An error has occurred", res.status)
        })
        .then((res) => {return res})
        .catch((err) => {
            console.error(err)
        });
    }

    addNewCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link }),
        });
    }

    deleteCard({ cardId }) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
    }

    addLike({ cardId }) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        })
        .then((res) => {
            res.ok 
                ? res.json()
                : Promise.reject("An error has occurred", res.status)
        })
        .then((res) => {return res})
        .catch((err) => {
            console.error(err)
        });
    }

    deleteLike({ cardId }) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then((res) => {
            res.ok 
                ? res.json()
                : Promise.reject("An error has occurred", res.status)
        })
        .then((res) => {return res})
        .catch((err) => {
            console.error(err)
        });
    }
  }