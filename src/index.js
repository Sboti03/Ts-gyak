"use strict";
const characters = /[a-z]/g;
let isErrorMsgOn;
var Errors;
(function (Errors) {
    Errors[Errors["ALL"] = 0] = "ALL";
    Errors[Errors["USER"] = 1] = "USER";
    Errors[Errors["UsernameLenght"] = 2] = "UsernameLenght";
    Errors[Errors["UsernameCharachers"] = 3] = "UsernameCharachers";
    Errors[Errors["Email"] = 4] = "Email";
})(Errors || (Errors = {}));
let errorMessages = new Map();
errorMessages.set(Errors.UsernameLenght, 'A felhasználó név legalább 6 maximum 30 karakter hosszú lehet!');
errorMessages.set(Errors.UsernameCharachers, 'A felhasználó név csak (a-z), (0-9) és 1db (.) karaktereket tartalmazhat');
errorMessages.set(Errors.Email, 'Kérem adjon meg egy valós email címet');
let showedErros = [];
document.addEventListener('DOMContentLoaded', () => {
    hideError(Errors.Email);
    hideError(Errors.USER);
    document.getElementById('username').addEventListener('change', (e) => {
        let username = e.currentTarget;
        if (username.value.length > 30 || username.value.length < 6) {
            showError(Errors.UsernameLenght);
        }
        else if (!checkCharacters(username.value)) {
            showError(Errors.UsernameCharachers);
        }
        else {
            hideError(Errors.USER);
        }
    });
    document.getElementById('email').addEventListener('change', (e) => {
        let email = e.currentTarget;
        if (!validateEmail(email.value)) {
            showError(Errors.Email);
        }
        else {
            hideError(Errors.Email);
        }
    });
});
const showError = (errorType) => {
    let elementId = '';
    let fieldId = '';
    switch (errorType) {
        case Errors.UsernameLenght:
        case Errors.UsernameCharachers:
            elementId = 'username-error';
            fieldId = 'username';
            break;
        case Errors.Email:
            elementId = 'email-error';
            fieldId = 'email';
            break;
    }
    let elem = document.getElementById(elementId);
    elem.textContent = errorMessages.get(errorType);
    elem.style.display = 'block';
    let field = document.getElementById(fieldId);
    field.classList.remove('input-tarsition');
    field.classList.add('input-tarsition-error');
};
const hideError = (errorType) => {
    let elementId = '';
    let fieldId = '';
    switch (errorType) {
        case Errors.USER:
            elementId = 'username-error';
            fieldId = 'username';
            break;
        case Errors.Email:
            fieldId = 'email';
            elementId = 'email-error';
            break;
    }
    document.getElementById(elementId).style.display = 'none';
    let field = document.getElementById(fieldId);
    if (field.classList.contains('input-tarsition-error')) {
        field.classList.add('input-tarsition');
        field.classList.remove('input-tarsition-error');
    }
};
const checkCharacters = (str) => {
    let characters = /^[a-zA-Z0-9.]+$/.test(str);
    if (str.split('.').length > 2) {
        characters = false;
    }
    return characters;
};
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
