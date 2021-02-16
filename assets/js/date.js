const formatDate = (number) =>  number < 10 ? '0' + number : number;

const dateBlock = document.querySelector('.footer__date');

const date = new Date();
const minutes = formatDate(date.getMinutes());
const hours = formatDate(date.getHours());
const day = formatDate(date.getDate());
const month = formatDate(date.getMonth() + 1);
const year = date.getFullYear();

dateBlock.innerHTML = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes;