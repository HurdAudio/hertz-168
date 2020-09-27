import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import audio_157431_1280 from '../img/audio_157431_1280.png';
import './login.style.jana.css';
import './login.style.janb.css';
import './login.style.janc.css';
import EncryptPassword from './encryptPassword';
import SetStatus from './setLoginStatus';
import axios from 'axios';


let landingFooterMessage = '';
let now = new Date();

if (now.getFullYear > 2020) {
    landingFooterMessage = '©2020 - ' + now.getFullYear() + ' ';
} else {
    landingFooterMessage = '©2020 ';
}
landingFooterMessage += 'HurdAudio';

function Login() {
    
    const [loginMonth, setLoginMonth] = useState('_JanuaryC');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [submitButtonClass, setSubmitButtonClass] = useState('loginSubmitHide');
    
    let localStorage = window.localStorage;
    
    const updateEmail = (val) => {
        setEmailValue(val);
    }
    
    const updatePassword = (val) => {
        setPasswordValue(val);
    }
    
    function showSubmit() {
        setSubmitButtonClass('loginSubmitShow');
    }
    
    function hideSubmit() {
        setSubmitButtonClass('loginSubmitHide');
    }
    
    function errorMessaging(err) {
        setErrorMessage(err);
    }
    
    const updateEmailValue = (email) => {
        setEmailValue(email);
        if ((emailValue.length > 0) && (passwordValue.length > 0)) {
            showSubmit();
        } else {
            hideSubmit();
        }
    }
    
    const updatePasswordValue = (password) => {
        setPasswordValue(password);
        if ((emailValue.length > 0) && (passwordValue.length > 0)) {
            showSubmit();
        } else {
            hideSubmit();
        }
    }
    
    const checkCreds = () => {
        let localStorage = window.localStorage;
        
        if (emailValue === 'devin@devinhurd.com') {
            if (passwordValue === 'password') {
                localStorage.setItem('vibratingAt168Hertz', true);
                window.location.reload(false);
            } else {
                localStorage.setItem('vibratingAt168Hertz', false);
            }
        }
        
    }
    
    const executeLogin = () => {
        axios(`/users/prelogin/${emailValue.toLowerCase()}`)
        .then(securirtyInfoData => {
            const security = securirtyInfoData.data;
            if (security.key === null) {
                errorMessaging('error: login fail');
                localStorage.setItem('vibratingAt168Hertz', false);
            } else {
                const submitPasswordArray = EncryptPassword(passwordValue, security);
                axios.post('/users/login', { email: emailValue, password: submitPasswordArray })
                .then(userResponseData => {
                    const response = userResponseData.data;
                    SetStatus(response);
                    if (response.login === 'forbidden') {
                        errorMessaging('error: login fail');
                    } else {
                        errorMessaging('login success');
                    }
                });
            }
        });
    }
        
    return(
        <div className={'loginContainer' + loginMonth}>
            <div className={'loginImageDiv' + loginMonth}>
                <NavLink className={'loginReturnToLandingLink' + loginMonth} to="/">
                    <img className={'loginNavIcon' + loginMonth}
                        src={audio_157431_1280} />
                </NavLink>
                <p className={'loginTitle' + loginMonth}>168 Hertz</p>
                <div className={'loginFormField' + loginMonth}>
                    <div className={'loginFormContainer' + loginMonth}>
                        <p className={'loginFormLabel' + loginMonth}>user login:</p>
                        <input className={'loginEmailInput' + loginMonth}
                            onChange={(e) => updateEmail(e.target.value)}
                            placeholder="email"
                            type="email"
                            value={emailValue}/>
                        <input className={'loginPasswordInput' + loginMonth}
                            onChange={(e) => updatePassword(e.target.value)}
                            placeholder="password"
                            type="password"
                            value={passwordValue} />
                        {((emailValue.indexOf('@') !== -1) && (passwordValue.length > 0)) && (<NavLink className={'loginSubmitNav' + loginMonth} to="/"><button className={'loginSubmitButton' + loginMonth}
                            onClick={() => executeLogin()}>submit</button></NavLink>)}
                        {((emailValue.indexOf('@') === -1) || (passwordValue.length === 0)) && (<button className={'loginSubmitButtonHidden' + loginMonth}>submit</button>)}
                        {(emailValue.indexOf('@') !== -1) && (<p className={'loginForgotPassword' + loginMonth}>forgot password?</p>)}
                        <p className={'loginFooter' + loginMonth}>{landingFooterMessage}</p>
                    </div>
                </div>
            </div>
        </div>
        );
}

export default Login;