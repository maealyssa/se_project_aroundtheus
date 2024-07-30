import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({ popupSelector });
        this._form = this._popup.querySelector('.modal__form');
        this._submitButton = this._popup.querySelector('.modal__button');
        this._formInputs = this._popup.querySelectorAll('input');
        this._handleFormSubmit = handleFormSubmit;
        this._buttonText = this._submitButton.textContent;
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

        this._popup.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues());
        });
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._submitButton.textContent = "Loading...";
        } else {
            this._submitButton.textContent = this._buttonText;
        }
    }

    close() {
        this._form.reset()
        super.close();        
    }
}