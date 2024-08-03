import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });        
        this._form = this._popup.querySelector("form");
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleDeleteSubmit();
        });
    }

    setSubmitAction(action) {
        this._handleDeleteSubmit = action;
    }
}
