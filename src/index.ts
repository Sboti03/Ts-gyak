const characters = /[a-z]/g

enum Errors {
    ALL,
    USER,
    PWD,
    UsernameLenght,
    UsernameCharachers,
    Email,
    ReEmail,
    PwdCharacters,
    PwdLenght,
    RePwd
}

let errorMessages = new Map<Errors, string>();
errorMessages.set(Errors.UsernameLenght, 'A felhasználó név legalább 6 maximum 30 karakter hosszú lehet!')
errorMessages.set(Errors.UsernameCharachers, 'A felhasználó név csak (a-z), (0-9) és 1db (.) karaktereket tartalmazhat')
errorMessages.set(Errors.Email, 'Kérem adjon meg egy valós email címet')
errorMessages.set(Errors.ReEmail, 'Nem eggyezik a két email cím!')
errorMessages.set(Errors.PwdCharacters, 'A jelszó csak (a-Z) (0-9) és (-_) karaktereket tartalmazhat!')
errorMessages.set(Errors.PwdLenght, 'A jelszónak legalább 5 maximum 10 karakter hosszúnak kell lennie!')
errorMessages.set(Errors.RePwd, 'A két jelszó nem eggyezik!')

let showedErros = [];

let username : string;
let email : string;
let reEmail : string;
let password : string;
let rePasswd : string;
let checkBoxOn : boolean = false;


document.addEventListener('DOMContentLoaded', ()=> {    
    hideError(Errors.Email)
    hideError(Errors.USER)
    hideError(Errors.ReEmail);
    hideError(Errors.PWD)
    hideError(Errors.RePwd)


    document.getElementById('username')!.addEventListener('input', (e)=> {
        let usernameField = e.currentTarget as HTMLInputElement;
        let usernameVld = usernameCheck(usernameField.value);
        
        if(usernameVld == null) {
            hideError(Errors.USER);
        } else {
            showError(usernameVld)
        }
    });

    document.getElementById('email')!.addEventListener('input', (e)=> {
        let emailField = e.currentTarget as HTMLInputElement;
        let emailVld = emailCheck(emailField.value);
        
        if(emailVld == null) {
            hideError(Errors.Email);
        } else {
            showError(emailVld);
        }        
});

    document.getElementById('re-email')!.addEventListener('input', (e)=> {
        let reEmailField = e.currentTarget as HTMLInputElement;
        let reEmailVld = reEmailCheck(reEmailField.value);
        if(reEmailVld == null) {
            hideError(Errors.ReEmail);
        } else {
            showError(reEmailVld);
        }        
    });

    document.getElementById('pwd')!.addEventListener('input', (e) => {
        let pwdField = e.currentTarget as HTMLInputElement
        let pwdVld = passwordCheck(pwdField.value);
        
        if(pwdVld == null) {
            hideError(Errors.PWD);
        } else {
            showError(pwdVld);
        }
    });

    document.getElementById('re-pwd')!.addEventListener('input', (e)=>{
        if(password != null || password !== '') {
            let rePwdField = e.currentTarget as HTMLInputElement;
            let rePwdVld = rePasswordCheck(rePwdField.value);
            if(rePwdVld == null) {
                hideError(Errors.RePwd);
            } else {
                showError(rePwdVld);
            }
        }
    });

    document.getElementById('reg-submit')!.addEventListener('click', ()=> {
        username = (document.getElementById('username') as HTMLInputElement).value
        email = (document.getElementById('email') as HTMLInputElement).value
        reEmail = (document.getElementById('re-email') as HTMLInputElement).value
        password = username = (document.getElementById('pwd') as HTMLInputElement).value
        rePasswd = (document.getElementById('re-pwd') as HTMLInputElement).value
        checkBoxOn = (document.getElementById('term-of-use') as HTMLInputElement).checked

        let usernameVld = usernameCheck(username) == null ? true : false;
        let emailVld = emailCheck(email) == null ? true : false;
        let reEmailVld = reEmailCheck(reEmail) == null ? true : false;
        let rePwdVld = rePasswordCheck(rePasswd) == null ? true : false;
        
        if(usernameVld && emailVld && reEmailVld && rePwdVld && checkBoxOn) {
            alert('Sikeres regisztráció')
        }
    });
});


const usernameCheck = (usernameField : string) => {
    if(usernameField.length > 30 || usernameField.length < 6) {
        return Errors.UsernameLenght

    } else if(!checkCharacters(usernameField)) {
        return Errors.UsernameCharachers
    }
    return null;
};


const emailCheck = (emailField : string) => {
    if(!validateEmail(emailField)) {
        return Errors.Email;
    }
    return null;
};

const reEmailCheck = (reEmailField : string) => {
    let emailField = document.getElementById('email') as HTMLInputElement;
    if(reEmailField !== emailField.value) {
        return Errors.ReEmail;
    }
    return null
};


const passwordCheck = (pwdField : string) => {
    if(!checkPassword(pwdField)) {
        return Errors.PwdCharacters;
    } else if(pwdField.length < 5 || pwdField.length > 10) {
        return Errors.PwdLenght;
    }
    return null;
}


const rePasswordCheck = (rePwdField : string) => {
    password = (document.getElementById('pwd') as HTMLInputElement).value
    if(rePwdField !== password) {
        return Errors.RePwd;
    }
    return null;
}



const showError = (errorType : Errors) => {
    let ids = getElementIdAndFieldId(errorType);
    let elementId = ids[0];
    let fieldId = ids[1];
    
    let elem = (document.getElementById(elementId) as HTMLElement);
    elem.textContent = (errorMessages.get(errorType) as string)
    elem.style.display = 'block'
    let field = (document.getElementById(fieldId) as HTMLElement)
    field.classList.remove('input-tarsition')
    field.classList.add('input-tarsition-error')
};

const hideError = (errorType : Errors) => {
    let ids = getElementIdAndFieldId(errorType);
    let elementId = ids[0];
    let fieldId = ids[1];

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

const checkPassword = (str : string) : boolean => {
    return /^[a-zA-Z0-9_-]+$/.test(str);
    
}

const validateEmail = (email : string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  const getElementIdAndFieldId = (errorType : Errors) => {
    let elementId = ''
    let fieldId = ''
    switch(errorType) {

        case Errors.UsernameLenght:
        case Errors.UsernameCharachers:
        case Errors.USER:  
            elementId = 'username-error';
            fieldId = 'username'
            break;

        case Errors.Email:
            elementId = 'email-error';
            fieldId = 'email'
            break;

        case Errors.ReEmail:
            elementId = 're-email-error'
            fieldId = 're-email'
            break; 

        case Errors.PWD:
        case Errors.PwdCharacters:
        case Errors.PwdLenght:
            fieldId = 'pwd'
            elementId = 'pwd-error'
            break;
        case Errors.RePwd:
            fieldId = 're-pwd'
            elementId = 're-pwd-error'
            break;
    }
    let result = [elementId, fieldId]
    return result;
  }