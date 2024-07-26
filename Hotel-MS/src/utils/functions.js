import Cookies from "universal-cookie";


export function naira_formater(number) {
    const parts = number.toString().split('.');
    let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return '₦' + integerPart + (parts[1] ? '.' + parts[1] : '');
}


export function setCookie(token) {
    let cookies = new Cookies();
    return cookies.set("usertkn", token, { maxAge: 604800 });
}


export function getCookies() {
    let cookies = new Cookies();
    return cookies.get('usertkn');
}


export function removeToken() {
    let cookies = new Cookies();
    return cookies.remove('usertkn')
}