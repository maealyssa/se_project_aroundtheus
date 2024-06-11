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
            showInputError(formElement, inputElement)
        } else {
            hideInputError(formElement, inputElement);
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
        submitButton.disabled = true;
    }

    _toggleButtonState(inputElements, submitButton) {
        if(hasInvalidInput(inputElements)) {
            disableButton(submitButton, inactiveButtonClass);
        } else {
            enableButton(submitButton, inactiveButtonClass);
        }
    }

    _setEventListeners() {
        const inputElements = [...this._formElement.querySelectorAll(inputSelector)];
        const submitButton = this._formElement.querySelector(submitButtonSelector);
        inputElements.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                _checkInputValidity(formElement, inputElement);
                _toggleButtonState(inputElements, submitButton);
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