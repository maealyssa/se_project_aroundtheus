class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
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

    _hasInvalidInput(inputList) {
        return !inputList.every((inputElement) => inputElement.validity.valid);
    }

    _disableButton(submitButton) {
        submitButton.classList.add(this._inactiveButtonClass);
        submitButton.disabled = true;
    }

    _enableButton(submitButton) {
        submitButton.classList.remove(this._inactiveButtonClass);
        submitButton.disabled = false;
    }

    _toggleButtonState(inputElements, submitButton) {
        if(this._hasInvalidInput(inputElements)) {
            this._disableButton(submitButton, this._inactiveButtonClass);
        } else {
            this._enableButton(submitButton, this._inactiveButtonClass);
        }
    }

    _setEventListeners() {
        const inputElements = [...this._formElement.querySelectorAll(this._inputSelector)];
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);
        inputElements.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputElements, submitButton);
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        this._setEventListeners()
    }

}

export default FormValidator;