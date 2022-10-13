"use strict";
const characters = /[a-z]/g;
var Errors;
(function (Errors) {
    Errors[Errors["ALL"] = 0] = "ALL";
    Errors[Errors["USER"] = 1] = "USER";
    Errors[Errors["PWD"] = 2] = "PWD";
    Errors[Errors["UsernameLenght"] = 3] = "UsernameLenght";
    Errors[Errors["UsernameCharachers"] = 4] = "UsernameCharachers";
    Errors[Errors["Email"] = 5] = "Email";
    Errors[Errors["ReEmail"] = 6] = "ReEmail";
    Errors[Errors["PwdCharacters"] = 7] = "PwdCharacters";
    Errors[Errors["PwdLenght"] = 8] = "PwdLenght";
    Errors[Errors["RePwd"] = 9] = "RePwd";
})(Errors || (Errors = {}));
let errorMessages = new Map();
errorMessages.set(Errors.UsernameLenght, 'A felhasználó név legalább 6 maximum 30 karakter hosszú lehet!');
errorMessages.set(Errors.UsernameCharachers, 'A felhasználó név csak (a-z), (0-9) és 1db (.) karaktereket tartalmazhat');
errorMessages.set(Errors.Email, 'Kérem adjon meg egy valós email címet');
errorMessages.set(Errors.ReEmail, 'Nem eggyezik a két email cím!');
errorMessages.set(Errors.PwdCharacters, 'A jelszó csak (a-Z) (0-9) és (-_) karaktereket tartalmazhat!');
errorMessages.set(Errors.PwdLenght, 'A jelszónak legalább 5 maximum 10 karakter hosszúnak kell lennie!');
errorMessages.set(Errors.RePwd, 'A két jelszó nem eggyezik!');
let showedErros = [];
let username;
let email;
let reEmail;
let password;
let rePasswd;
let checkBoxOn = false;
document.addEventListener('DOMContentLoaded', () => {
    hideError(Errors.Email);
    hideError(Errors.USER);
    hideError(Errors.ReEmail);
    hideError(Errors.PWD);
    hideError(Errors.RePwd);
    document.getElementById('username').addEventListener('input', (e) => {
        let usernameField = e.currentTarget;
        let usernameVld = usernameCheck(usernameField.value);
        if (usernameVld == null) {
            hideError(Errors.USER);
        }
        else {
            showError(usernameVld);
        }
    });
    document.getElementById('email').addEventListener('input', (e) => {
        let emailField = e.currentTarget;
        let emailVld = emailCheck(emailField.value);
        if (emailVld == null) {
            hideError(Errors.Email);
        }
        else {
            showError(emailVld);
        }
    });
    document.getElementById('re-email').addEventListener('input', (e) => {
        let reEmailField = e.currentTarget;
        let reEmailVld = reEmailCheck(reEmailField.value);
        if (reEmailVld == null) {
            hideError(Errors.ReEmail);
        }
        else {
            showError(reEmailVld);
        }
    });
    document.getElementById('pwd').addEventListener('input', (e) => {
        let pwdField = e.currentTarget;
        let pwdVld = passwordCheck(pwdField.value);
        if (pwdVld == null) {
            hideError(Errors.PWD);
        }
        else {
            showError(pwdVld);
        }
    });
    document.getElementById('re-pwd').addEventListener('input', (e) => {
        if (password != null || password !== '') {
            let rePwdField = e.currentTarget;
            let rePwdVld = rePasswordCheck(rePwdField.value);
            if (rePwdVld == null) {
                hideError(Errors.RePwd);
            }
            else {
                showError(rePwdVld);
            }
        }
    });
    document.getElementById('reg-submit').addEventListener('click', () => {
        username = document.getElementById('username').value;
        email = document.getElementById('email').value;
        reEmail = document.getElementById('re-email').value;
        password = username = document.getElementById('pwd').value;
        rePasswd = document.getElementById('re-pwd').value;
        checkBoxOn = document.getElementById('term-of-use').checked;
        let usernameVld = usernameCheck(username) == null ? true : false;
        let emailVld = emailCheck(email) == null ? true : false;
        let reEmailVld = reEmailCheck(reEmail) == null ? true : false;
        let rePwdVld = rePasswordCheck(rePasswd) == null ? true : false;
        if (usernameVld && emailVld && reEmailVld && rePwdVld && checkBoxOn) {
            alert('Sikeres regisztráció');
        }
    });
});
const usernameCheck = (usernameField) => {
    if (usernameField.length > 30 || usernameField.length < 6) {
        return Errors.UsernameLenght;
    }
    else if (!checkCharacters(usernameField)) {
        return Errors.UsernameCharachers;
    }
    return null;
};
const emailCheck = (emailField) => {
    if (!validateEmail(emailField)) {
        return Errors.Email;
    }
    return null;
};
const reEmailCheck = (reEmailField) => {
    let emailField = document.getElementById('email');
    if (reEmailField !== emailField.value) {
        return Errors.ReEmail;
    }
    return null;
};
const passwordCheck = (pwdField) => {
    if (!checkPassword(pwdField)) {
        return Errors.PwdCharacters;
    }
    else if (pwdField.length < 5 || pwdField.length > 10) {
        return Errors.PwdLenght;
    }
    return null;
};
const rePasswordCheck = (rePwdField) => {
    password = document.getElementById('pwd').value;
    if (rePwdField !== password) {
        return Errors.RePwd;
    }
    return null;
};
const showError = (errorType) => {
    let ids = getElementIdAndFieldId(errorType);
    let elementId = ids[0];
    let fieldId = ids[1];
    let elem = document.getElementById(elementId);
    elem.textContent = errorMessages.get(errorType);
    elem.style.display = 'block';
    let field = document.getElementById(fieldId);
    field.classList.remove('input-tarsition');
    field.classList.add('input-tarsition-error');
};
const hideError = (errorType) => {
    let ids = getElementIdAndFieldId(errorType);
    let elementId = ids[0];
    let fieldId = ids[1];
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
const checkPassword = (str) => {
    return /^[a-zA-Z0-9_-]+$/.test(str);
};
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
const getElementIdAndFieldId = (errorType) => {
    let elementId = '';
    let fieldId = '';
    switch (errorType) {
        case Errors.UsernameLenght:
        case Errors.UsernameCharachers:
        case Errors.USER:
            elementId = 'username-error';
            fieldId = 'username';
            break;
        case Errors.Email:
            elementId = 'email-error';
            fieldId = 'email';
            break;
        case Errors.ReEmail:
            elementId = 're-email-error';
            fieldId = 're-email';
            break;
        case Errors.PWD:
        case Errors.PwdCharacters:
        case Errors.PwdLenght:
            fieldId = 'pwd';
            elementId = 'pwd-error';
            break;
        case Errors.RePwd:
            fieldId = 're-pwd';
            elementId = 're-pwd-error';
            break;
    }
    let result = [elementId, fieldId];
    return result;
};
