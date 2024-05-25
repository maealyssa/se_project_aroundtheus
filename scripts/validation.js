// enabling validation by calling enableValidation()
// pass all the settings on call

const showInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(errorClass);
}

const checkInputValidity = (formElement, inputElement, options) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, options)
    } else {
        hideInputError(formElement, inputElement, options);
    }
}

const hasInvalidInput = (inputList) => {
    return !inputList.every((inputElement) => inputElement.validity.valid);
}

const disableButton = (submitButton, { inactiveButtonClass }) => {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
}

const enableButton = (submitButton, { inactiveButtonClass }) => {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

const toggleButtonState = (inputElements, submitButton, { inactiveButtonClass }) => {
    if(hasInvalidInput(inputElements)) {
        disableButton(submitButton, { inactiveButtonClass });
    } else {
        enableButton(submitButton, { inactiveButtonClass });
    }
}

const setEventListeners = (formElement, options) => {
    const { inputSelector } = options;
    const inputElements = [...formElement.querySelectorAll(inputSelector)];
    const submitButton = formElement.querySelector(".modal__button");
    inputElements.forEach(inputElement => {
        inputElement.addEventListener('input', (e) => {
            checkInputValidity(formElement, inputElement, options);
            toggleButtonState(inputElements, submitButton, options);
        })
    })
}

const enableValidation = (options) => {
    const formElements = [...document.querySelectorAll(options.formSelector)];
    formElements.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        setEventListeners(formElement, options)
    })
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

enableValidation(config);