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
    closeLink = true;
    
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
    var popup = document.getElementById('cookie-popup');
    if(popup){
        popup.className('visible');
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
            link.style.clear = 'both';
            link.style.display = 'inline-block';
            link.href = policyLink;
            link.innerHTML = policyTitle;
            popup.appendChild(document.createElement('br'));
            popup.appendChild(link);
        }
        
        if(closeLink){
            var close = document.createElement('a');
            close.style.clear = 'both';
            close.style.display = 'inline-block';
            close.href = '#';
            close.onclick = hideCookiePopup;
            close.innerHTML = 'Close';
            popup.appendChild(document.createElement('br'));
            popup.appendChild(close);
        }
        
        document.body.appendChild(popup);
    }
    
    if(visibleSeconds > 0)
        setTimeout(function(){
            document.getElementById('cookie-popup').style.display = 'none';
        }, visibleSeconds * 1000);
}
function hideCookiePopup(){
    setCookie('cookielawseen', true);
}