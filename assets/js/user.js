const userSession = localStorage.getItem('userSession');
const loginLinks = document.querySelector('.navbar__top__links');
const userInfo = document.querySelector('.navbar__top__user');
const userName = document.querySelector('.navbar__top__username');
const logoutButton = document.querySelector('.navbar__top__user__logout');

const checkUser = () => {
    if(userSession === 'logged') {
        loginLinks.classList.add('d-none');
        userInfo.classList.add('d-flex');
        userInfo.classList.remove('d-none');
        userName.textContent = localStorage.getItem('currentUser');
    } else {
        loginLinks.classList.remove('d-none');
        userInfo.classList.remove('d-flex');
        userInfo.classList.add('d-none');
    }
}

window.onload = () => {
    checkUser();
}

logoutButton.addEventListener('click', (event) => {
    alert('Sesión cerrada con éxito');

    loginLinks.classList.remove('d-none');
    userInfo.classList.remove('d-flex');
    userInfo.classList.add('d-none');
    localStorage.setItem('userSession', 'inactive');
    localStorage.setItem('currentUser', '');
    
    window.location.replace('/');
})