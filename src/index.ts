const characters = /[a-z]/g

let isErrorMsgOn : boolean;

enum Errors {
    ALL,
    USER,
    UsernameLenght,
    UsernameCharachers,
    Email
}


let errorMessages = new Map<Errors, string>();

errorMessages.set(Errors.UsernameLenght, 'A felhasználó név legalább 6 maximum 30 karakter hosszú lehet!')
errorMessages.set(Errors.UsernameCharachers, 'A felhasználó név csak (a-z), (0-9) és 1db (.) karaktereket tartalmazhat')
errorMessages.set(Errors.Email, 'Kérem adjon meg egy valós email címet')


let showedErros = [];



document.addEventListener('DOMContentLoaded', ()=> {    
    hideError(Errors.Email)
    hideError(Errors.USER)


    document.getElementById('username')!.addEventListener('change', (e)=> {
        let username = e.currentTarget as HTMLInputElement;
        if(username.value.length > 30 || username.value.length < 6) {
            showError(Errors.UsernameLenght)
        } else if(!checkCharacters(username.value)){
            showError(Errors.UsernameCharachers)
        } else {
            hideError(Errors.USER)
        }
    });

    document.getElementById('email')!.addEventListener('change', (e)=> {
        let email = e.currentTarget as HTMLInputElement;
        if(!validateEmail(email.value)) {
            showError(Errors.Email)
        } else {
            hideError(Errors.Email)
        }
    })

})



const showError = (errorType : Errors) => {
    let elementId = ''
    let fieldId = ''
    switch(errorType) {
        case Errors.UsernameLenght:
        case Errors.UsernameCharachers:    
            elementId = 'username-error';
            fieldId = 'username'
            break;
        case Errors.Email:
            elementId = 'email-error';
            fieldId = 'email'
            break;
    }
    let elem = (document.getElementById(elementId) as HTMLElement);
    elem.textContent = (errorMessages.get(errorType) as string)
    elem.style.display = 'block'
    let field = (document.getElementById(fieldId) as HTMLElement)
    field.classList.remove('input-tarsition')
    field.classList.add('input-tarsition-error')
}

const hideError = (errorType : Errors) => {
    let elementId = ''
    let fieldId = ''
    switch(errorType) {
        case Errors.USER:
            elementId = 'username-error'
            fieldId = 'username'
            break;
        case Errors.Email:
            fieldId = 'email'
            elementId = 'email-error'
            break;
    }
    (document.getElementById(elementId) as HTMLElement).style.display = 'none'
    let field = (document.getElementById(fieldId) as HTMLElement)
    if(field.classList.contains('input-tarsition-error')) {
        field.classList.add('input-tarsition')
        field.classList.remove('input-tarsition-error')
    }
    
}

const checkCharacters = (str : string) : boolean => {
    let characters = /^[a-zA-Z0-9.]+$/.test(str);
    if(str.split('.').length > 2) {
        characters = false
    }
    return characters;
}

const validateEmail = (email : string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };