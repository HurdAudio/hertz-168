import React, {
    Component
} from 'react';

import Landing from './landing/landing';
import UserHub from './userhub/userhub';
import './css/reset.css';

let userLoggedIn = false;
let localStorage = window.localStorage;

if (localStorage.getItem('vibratingAt168Hertz') === 'true') {
    userLoggedIn = true;
}

class App extends Component {
    
    render() {
        if (userLoggedIn) {
            return (
                <UserHub />
            )
        } else {
            return ( 
                <Landing / >
            );
        }
    }
}

export default App;
