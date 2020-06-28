import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './landing.style.jana.css';

const now = new Date();

let landingFooterMessage = '';

if (now.getFullYear > 2020) {
    landingFooterMessage = '©2020 - ' + now.getFullYear() + ' ';
} else {
    landingFooterMessage = '©2020 ';
}
landingFooterMessage += 'HurdAudio';


function Landing() {
    
    const [landingMonth, setLandingMonth] = useState('_JanuaryA');
        
        return(
            <Router>
                <div className={'container' + landingMonth}>
                    <div className={'imageDiv' + landingMonth}>
                        <h1 className={'landingTitle' + landingMonth}>168 Hertz</h1>
                        <button className={'landingLoginButton' + landingMonth}>login</button>
                        <button className={'landingAboutButton' + landingMonth}>about</button>
                        <button className={'landingSignupButton' + landingMonth}>signup</button>
                        <div className={'landingLeftSpeaker' + landingMonth}></div>
                        <div className={'landingRightSpeaker' + landingMonth}></div>
                        <img className={'landingVibration' + landingMonth}
                            src="https://hertz-168.s3.amazonaws.com/landing/january/vibration/sound_wave_frequency_vibration_hertz_pressure_pitch-512.png" />
                        <p className={'landingFooter' + landingMonth}>{landingFooterMessage}</p>
                    </div>
                </div>
            </Router>
        );
}

export default Landing;