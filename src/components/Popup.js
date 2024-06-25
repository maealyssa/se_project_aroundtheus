export default class Popup {
    constructor(popup) {
        this._popup = popup;
    }

    setEventListeners() {

    }

    open() {
        this._popup.classList.add('modal_opened');
    }

    close() {
        this._popup.classList.remove('modal_opened');
    }

    _handleEscClose(evt) {
        if(evt.key === "Escape") {
            this.close(this._popup);
        }
    }

    _handleClickClose(evt) {
        if (evt.target === evt.currentTarget || evt.target.classList.contains("modal__close")) {
            this.close(evt.currentTarget);
        }
    }
}