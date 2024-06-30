export default class Popup {
    constructor({ popupSelector }) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.modal__close');
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });

        this._closeButton.addEventListener('click', () => this.close());
    }

    open() {
        this._popup.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('modal_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if(evt.key === "Escape") {
            this.close();
        }
    }
}