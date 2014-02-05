var until = 5,
    times = getCookie('cookielaw'),
    seen = getCookie('cookielawseen'),
    wording = "This site uses cookies, by continuing to browse the site you are agreeing to allow the use of cookies.",
    notice = document.createElement('div');
    
if(typeof cookieWording !== 'undefined')
    wording = cookieWording;
    
if (times < until && !seen){
    showCookieNotice();
    setCookie('cookielaw', ++times);
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

function showCookieNotice(){
    
    notice.setAttribute('class', 'cookie-popup');
    
    var text = document.createElement('p');
    text.innerHTML = wording;
    text.style.float = 'left';
    text.style.margin = '0';
    notice.appendChild(text);
    
    var close = document.createElement('a');
    close.innerHTML = 'Close';
    close.style.float = 'right';
    close.style.cursor = 'pointer';
    close.onclick = hideCookieNotice;
    notice.appendChild(close);
    
    var styles = {
        WebkitTransition: '.5s',
        MozTransition: '.5s',
        OTransition: '.5s',
        transition: '.5s',
        height: '0px',
        overflow: 'hidden',
        padding: '0 1em',
        color: '#FFF',
        backgroundColor: '#333'
    };
    for(var k in styles){
        notice.style[k] = styles[k];
    }
    
    document.body.appendChild(notice);
    
    setTimeout(function(){
        notice.style.height = 'auto';
        notice.style.padding = '1em 1em';
    }, 1);
}

function hideCookieNotice(){
    notice.style.height = '0px';
    notice.style.padding = '0 1em';
    setCookie('cookielawseen', true);
}