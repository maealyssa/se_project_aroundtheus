import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });
        this._submitButton = this._popup.querySelector(".modal__button");
        this._loadingButtonText = loadingButtonText;
    }

    setEventListeners() {
        super.setEventListeners();

        this._submitButton.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleDeleteSubmit();
        });
    }

    open(handleDeleteCallback) {
        this._handleDeleteCallback = handleDeleteCallback;
        super.open();
    }

    setSubmitAction(action) {
        this._handleDeleteSubmit = action;
    }
}
