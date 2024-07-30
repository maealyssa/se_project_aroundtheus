import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, loadingText = "Saving...") {
        super({ popupSelector });
        this._form = this._popup.querySelector('.modal__form');
        this._submitButton = this._popup.querySelector('.modal__button');
        this._formInputs = this._popup.querySelectorAll('input');
        this._handleFormSubmit = handleFormSubmit;
        this._buttonText = this._submitButton.textContent;
        this._loadingText = loadingText;
    }

    showLoading() {
        this._buttonText = this._loadingText;
    }

    hideLoading() {
        this._buttonText = this._buttonText;
    }

    _getInputValues() {
        const inputObject = {};

        this._formInputs.forEach(input => {
            inputObject[input.name] = input.value;
        });

        return inputObject;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', (evt) => {
            this._handleFormSubmit(this._getInputValues());
            evt.preventDefault();
        });
    }

    close() {
        this._form.reset()
        super.close();        
    }
}