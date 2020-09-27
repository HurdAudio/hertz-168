function SetStatus(user) {
        
    function clearCookiesAndStorage() {
            let storage = window.localStorage;
            storage.removeItem('eventualUser');
            storage.removeItem('eventualRelease');
            document.cookie = "eventualUser=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = "eventualRelease=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }

    function getCookie(name) {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; ++i) {
            var pair = cookies[i].trim().split('=');
            if (pair[0] === name) {
                return (pair[1]);
            }
        }
        return null;
    }
    
    let localStorage = window.localStorage;
    
    if (user.login === 'forbidden') {
        clearCookiesAndStorage();
        localStorage.setItem('vibratingAt168Hertz', false);
    } else {
        localStorage.setItem('heinrichRudolph', user.uuid);
        document.cookie = "heinrichRudolph=" + user.uuid;
        localStorage.setItem('hertzRelease', user.security.expire);
        document.cookie = "hertzRelease=" + user.security.expire;
        localStorage.setItem(user.security.key, user.security.value);
        document.cookie = user.security.key + "=" + user.security.value;
        localStorage.setItem('vibratingAt168Hertz', true);
    }
    
}

export default SetStatus;