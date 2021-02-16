const contactButton = document.querySelector('.contact-form__button');

const resetFields = () => {
    const inputs = Array.from(document.querySelectorAll('.contact-form__input'));
    inputs.forEach((input) => {
        input.classList.remove('input-error');
        input.value = '';
    });
}

const checkString = (str) => {
    for(let i = 0; i < str.length; i++){
        if(str[i] < 65 || (str[i] > 90 && str[i] < 97) || str[i] > 122) return false;
    }
    return true;
}

const checkEmptyFields = () => {
    let error = 0;
    const inputs = Array.from(document.querySelectorAll('.contact-form__input'));

    inputs.forEach((input) => {
        input.classList.remove('input-error');
        if(input.value === '') {
            input.classList.add('input-error');
            error++;
        }
    });

    if(error > 0) {
        alert('Por favor, llene todos los campos para continuar');
    }
}

const validateInfo = () => {
    let errorMsgs = [];
    const fName = document.querySelector('#contact-form__input--fName');
    const lName = document.querySelector('#contact-form__input--lName');
    const email = document.querySelector('#contact-form__input--email');
    const phone = document.querySelector('#contact-form__input--phone');
    const message = document.querySelector('#contact-form__input--message');

    checkEmptyFields();

    // First name checks
    if(fName.value.split(' ').length > 3) {
        fName.classList.add('input-error');
        errorMsgs.push('Solo se permiten de 1 a 3 nombres');
    }
    if(!checkString(fName.value)) {
        fName.classList.add('input-error');
        errorMsgs.push('No se permiten caracteres especiales en el nombre');
    }
    // Last name checks
    if(lName.value.split(' ').length > 2) {
        lName.classList.add('input-error');
        errorMsgs.push('Solo se permiten de 1 a 3 nombres');
    }
    if(!checkString(lName.value)) {
        lName.classList.add('input-error');
        errorMsgs.push('No se permiten caracteres especiales en el apellido');
    }
    // Email checks
    const destEmail = email.value.split('@');
    const destDomain = destEmail[1].split('.');
    if(destEmail[0].length > 5) {
        email.classList.add('input-error');
        errorMsgs.push('El correo debe de contener máximo 5 letras');
    }
    if(destDomain[0].length > 5) {
        email.classList.add('input-error');
        errorMsgs.push('El dominio debe de contener máximo 5 letras');
    }
    if(destDomain.length > 4) {
        email.classList.add('input-error');
        errorMsgs.push('Solo se permiten de 1 a 3 extensiones');
    }
    // Phone checks
    if(phone.value.length !== 10) {
        phone.classList.add('input-error');
        errorMsgs.push('Solo se permiten telefonos de 10 digitos');
    }
    // Message checks
    if(message.value.length > 255) {
        message.classList.add('input-error');
        errorMsgs.push('Solo se permiten mensaje de 255 caracteres o menos');
    }
    
    if(errorMsgs.length > 0) {
        alert('Corrija estos errores para continuar:\n    ' + errorMsgs.join('\n    '));
        return false;
    }

    return true;
};
			
contactButton.addEventListener('click', (event) => {
    if(!validateInfo()) return;

    const contactName = document.querySelector('#contact-form__input--fName').value;

    alert("Hola " + contactName + ", TAZIA te enviará un mensaje pronto");
    resetFields();
});

