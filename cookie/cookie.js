var until = 5,
    visibleSeconds = 10, 
    times = getCookie('cookielaw'),
    seen = getCookie('cookielawseen'),
    wording = "This site uses cookies, by continuing to browse the site you are agreeing to allow the use of cookies.",
    position = ['bottom', 'right'],
    bg = '#333',
    color = '#FFF',
    policyLink = '/cookie-policy',
    policyTitle = 'Cookie Policy',
    closeLink = true,
    popup = document.getElementById('cookie-popup'),
    usesCustom = document.getElementById('cookie-popup');
    
if (times < until && !seen){
    cookiePopup();
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
function cookiePopup(){
    if(usesCustom){
        visibleSeconds = popup.getAttribute('data-visible-seconds') || 10;
        popup.setAttribute('class', popup.className + ' visible');
        
        var close = document.getElementById('cookie-close');
        if(close)
            close.onclick = hideCookiePopup;
    }
    else{
        popup = document.createElement('p');
        popup.id = 'cookie-popup';
        popup.innerHTML = wording;
        
        popup.style.position = 'fixed';
        for(var i=0; i<position.length; i++){
            popup.style[position[i]] = '1em';
        }
        
        popup.style.backgroundColor = bg;
        popup.style.color = color;
        popup.style.padding = '.5em 1em';
        
        if(policyLink){
            var link = document.createElement('a');
            link.href = policyLink;
            link.setAttribute('class', 'cookie-link');
            link.innerHTML = policyTitle;
            popup.appendChild(document.createElement('br'));
            popup.appendChild(link);
        }
        
        if(closeLink){
            var close = document.createElement('a');
            close.href = '#';
            close.onclick = hideCookiePopup;
            close.setAttribute('class', 'cookie-close');
            close.innerHTML = 'Close';
            popup.appendChild(document.createElement('br'));
            popup.appendChild(close);
        }
        
        document.body.appendChild(popup);
    }
    
    if(visibleSeconds > 0)
        setTimeout(function(){
            if(usesCustom)
                popup.setAttribute('class', popup.className.replace('visible', ''));
            else
                document.getElementById('cookie-popup').style.display = 'none';
        }, visibleSeconds * 1000);
}
function hideCookiePopup(){
    if(usesCustom)
        popup.setAttribute('class', popup.className.replace('visible', ''));
    else
        document.getElementById('cookie-popup').style.display = 'none';
    setCookie('cookielawseen', true);
}