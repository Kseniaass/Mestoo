const showInputError = (formElement, input, errorMessage, config) => {
    const formError = formElement.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(config.errorClass);
}
const coverInputError = (formElement, input, config) => {
    const formError = formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    formError.classList.remove(config.errorClass);
    formError.textContent = '';
};
const hideInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
};
const checkInvalidInput = (formElement, input, config) => {
    if (!input.validity.valid) {
        showInputError(formElement, input, input.validationMessage, config);
    }
    else {
        coverInputError(formElement, input, config);
    }
};
const resetValidation = (formElement, config) => {
    const inputList = [...formElement.querySelectorAll(config.inputSelector)];

    inputList.forEach((input) => {
        coverInputError(formElement, input, config);
    });
}

const toggleButtonState = (inputList, button, config) => {
    if (hideInvalidInput(inputList)) {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
    else {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    }
}
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const button = formElement.querySelector(config.submitButtonSelector);
    console.log('submit', button);
    toggleButtonState(inputList, button, config);;
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInvalidInput(formElement, input, config);
            toggleButtonState(inputList, button, config);
        });
    });
    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            resetValidation(formElement, config);
            toggleButtonState(inputList, button, config);
        }, 0);
    });
}
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
}
enableValidation ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
});