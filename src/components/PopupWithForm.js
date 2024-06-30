import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleAddCardFormSubmit) {
        super({ popupSelector });
        this._form = this._popup.querySelector('.modal__form');
        this._submitButton = this._popup.querySelector('.modal__button');
        this._formInputs = this._popup.querySelectorAll('input');
        this._handleAddCardFormSubmit = handleAddCardFormSubmit;
    }

    _getInputValues() {
        const inputObject = {};

        this._formInputs.forEach(input => {
            inputObject[input.name] = input.value;
        })

        return inputObject;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', (evt) => {
            this._handleAddCardFormSubmit(this._getInputValues());
            evt.preventDefault();
        });
    }

    close() {
        this._form.reset()
        super.close();        
    }
}