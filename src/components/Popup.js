export default class Popup {
    constructor({ popup }) {
        this._popup = document.querySelector(popup);
        this._closeModalButton = this._popup.querySelector('.modal__close')
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains("modal") || evt.target.classList.contains('.modal__close')) {
                this.close();
            }
        });
    }

    open() {
        this._popup.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('modal_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if(evt.key === "Escape") {
            this.close();
        }
    }
}