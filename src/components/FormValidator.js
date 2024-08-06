export default class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
        this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    }

    _showInputError(inputElement) {
        const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass);
        errorMessageElement.textContent = inputElement.validationMessage;
        errorMessageElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass);
        errorMessageElement.textContent = "";
        errorMessageElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement)
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return !this._inputElements.every((inputElement) => inputElement.validity.valid);
    }

    disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }

    _enableButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }

    _toggleButtonState() {
        if(this._hasInvalidInput()) {
            this.disableButton();
        } else {
            this._enableButton();
        }
    }

    _setEventListeners() {
        this._inputElements = [...this._formElement.querySelectorAll(this._inputSelector)];
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

        this._inputElements.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            // this.disableButton();
        });

        this._setEventListeners()
    }

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

}
