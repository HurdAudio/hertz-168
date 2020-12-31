import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from '../login/login';
import './landing.style.jana.css';
import './landing.style.janb.css';
import './landing.style.janc.css';
import './landing.style.feba.css';
import './landing.style.febb.css';
import './landing.style.febc.css';

const now = new Date();

let landingFooterMessage = '';

if (now.getFullYear > 2020) {
    landingFooterMessage = '©2020 - ' + now.getFullYear() + ' ';
} else {
    landingFooterMessage = '©2020 ';
}
landingFooterMessage += 'HurdAudio';

const janAVibration = 'https://hertz-168.s3.amazonaws.com/landing/january/vibration/sound_wave_frequency_vibration_hertz_pressure_pitch-512.png';
const janBVibration = 'https://hertz-168.s3.amazonaws.com/landing/january/vibration/aca6b497ffa33ed2ff03ac84be7a9678.jpg';
const janCVibration = 'https://hertz-168.s3.amazonaws.com/landing/january/vibration/soundwaves.jpg';
const febAVibration = 'https://hertz-168.s3.amazonaws.com/landing/february/vibrations/d1gio8i-0f592609-d012-4baf-8d98-2cd5f4110cc4.jpg';
const febBVibration = 'https://hertz-168.s3.amazonaws.com/landing/february/vibrations/vibration_by_piethein21_d39lljw-pre.jpg';
const febCVibration = 'https://hertz-168.s3.amazonaws.com/landing/february/vibrations/48411753596_c16cb48c9a_k.jpg';

let toLogin = false;

function Landing() {
    
    const [landingMonth, setLandingMonth] = useState('_FebruaryC');
    const [landingVibaration, setLandingVibration] = useState(febCVibration);
    
    const checkLogin = () => {
        if (window.localStorage.getItem('vibratingAt168Hertz') === 'true') {
            window.location.reload(false);
        }
    }
    
    const updateLoginAttempt = () => {
        toLogin = true;
    }
            
    return(
        <Router>
            <div className={'container' + landingMonth}
                onMouseMove={() => checkLogin()}>
                <div className={'imageDiv' + landingMonth}>
                    <h1 className={'landingTitle' + landingMonth}>168 Hertz</h1>
                    <Link className={'landingLoginButtonLink' + landingMonth}
                        to="/login">
                        <button className={'landingLoginButton' + landingMonth}>login</button>
                    </Link>
                    <button className={'landingAboutButton' + landingMonth}>about</button>
                    <button className={'landingSignupButton' + landingMonth}>signup</button>
                    <div className={'landingLeftSpeaker' + landingMonth}></div>
                    <div className={'landingRightSpeaker' + landingMonth}></div>
                    <img className={'landingVibration' + landingMonth}
                        src={landingVibaration} />
                    <p className={'landingFooter' + landingMonth}>{landingFooterMessage}</p>
                </div>
            </div>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}

export default Landing;