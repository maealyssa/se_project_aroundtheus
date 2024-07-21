export default class UserInfo {
    constructor(nameEl, descriptionEl, avatar) {
        this._nameEl = document.querySelector(nameEl);
        this._descriptionEl = document.querySelector(descriptionEl);
        this._link = avatar;
    }

    // getUserInfo() {
    //     return {
    //         name: this._nameEl.textContent,
    //         description: this._descriptionEl.textContent,
    //     }
    // }

    setUserInfo(name, description) {
        this._nameEl.textContent = name;
        this._descriptionEl.textContent = description;
    }

    setAvatarImage(link) {
        this._link.src = link;
    }
}