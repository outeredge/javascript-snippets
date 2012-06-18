var timesShown = 4;
var cookieLaw = getCookie('cookielaw');
if (cookieLaw < timesShown){
    showCookiePopup();
    setCookie('cookielaw', ++cookieLaw);
}
function getCookie(cName){
    var cookies = document.cookie.split(';');
    var cookie, name = '';
    for (var i=0; i<cookies.length; i++){
        cookie = cookies[i].split('=');
        name = cookie[0].replace(/^\s+|\s+$/g, '');
        if (name == cName){
            return unescape(cookie[1].replace(/^\s+|\s+$/g, ''));
        }
    }
    return parseInt(0);
}
function setCookie(cName, cValue){
    var today = new Date();
    today.setTime(today.getTime());
    var expires = new Date(today.getTime() + 31536000000);
    var cookieParams = [
        cName + '=' + escape(cValue), 
        'expires=' + expires.toGMTString(),
        'path=/'
    ];
    document.cookie = cookieParams.join(';');
}
function showCookiePopup(){
    document.getElementById('cookiePopup').style.display = 'block';
}
function hideCookiePopup(){
    document.getElementById('cookiePopup').style.display = 'none';
}