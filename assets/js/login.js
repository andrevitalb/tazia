// User Login fields
const usernameField = document.querySelector('.login__input--username');
const passwordField = document.querySelector('.login__input--password');
const loginButton = document.querySelector('#login__button');

window.onload = () => {
    if(localStorage.getItem('userSession') === 'logged')
    window.location.replace('/');
};

loginButton.addEventListener('click', (event) => {
    if(localStorage.getItem('userSession') === 'logged') return;

    const userData = {
        user: usernameField.value,
        password: passwordField.value
    };

    const userString = localStorage.getItem('userList');

    if(userString !== null) {
        const userList = JSON.parse(userString);

        if(userList.some((user) => user.user === userData.user && user.password === userData.password)) {
            localStorage.setItem('userSession', 'logged');
            localStorage.setItem('currentUser', userData.user);
            window.location.replace('/');
        } else {
            alert('Error, usuario y contraseña no coinciden');
            usernameField.value = '';
            passwordField.value = '';
        }
    } else {
        alert('Error, no hay usuarios registrados');
        window.location.replace('/register');
    }
});