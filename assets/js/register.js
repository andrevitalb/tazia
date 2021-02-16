// User Register fields
const usernameField = document.querySelector('.register__input--username');
const passwordField = document.querySelector('.register__input--password');
const passwordConfirmField = document.querySelector('.register__input--password-confirm');
const registerButton = document.querySelector('.register__button');

window.onload = () => {
    if(localStorage.getItem('userSession') === 'logged')
    window.location.replace('/');
};

const emptyRegistrationFields = (fields = 'all') => {
    fields === 'all' ? (
        usernameField.value = '',
        passwordField.value = '',
        passwordConfirmField.value = ''
    ) : fields.forEach((field) => field.value = '');
}

registerButton.addEventListener('click', (event) => {
    if(localStorage.getItem('userSession') === 'logged') return;

    if(passwordField.value !== passwordConfirmField.value) {
        alert('Error, las contraseñas no coinciden');
        emptyRegistrationFields(passwordField, passwordConfirmField);
        return;
    }

    const newUser = {
        user: usernameField.value,
        password: passwordField.value
    };

    const userString = localStorage.getItem('userList');
    let userList;

    if(userString !== null) {
        userList = JSON.parse(userString);

        if(userList.some((user) => user.user === newUser.user)) {
            alert('Error, usuario ya existente');
            emptyRegistrationFields(usernameField);
            return;
        }
        
        userList.push(newUser);
    } else {
        userList = [];
        userList.push(newUser);
    }

    emptyRegistrationFields();

    localStorage.setItem('userSession', 'logged');
    localStorage.setItem('currentUser', newUser.user);
    
    localStorage.setItem('userList', JSON.stringify(userList));
});