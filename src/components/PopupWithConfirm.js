import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleDelete) {
        super({ popupSelector });
        this._handleDelete = handleDelete;
        this._submitButton = this._popup.querySelector(".modal__button");
    }

    setEventListeners() {
        super.setEventListeners();

        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            if (this._handleDeleteCallback) {
                this._handleDeleteCallback();
            }
        });
    }

    open(handleDeleteCallback) {
        this._handleDeleteCallback = handleDeleteCallback;
        super.open();
    }
}