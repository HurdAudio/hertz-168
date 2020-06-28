import React, {
    Component
} from 'react';

import Landing from './landing/landing';
import './css/reset.css';

//let userLoggedIn = false;
//let localStorage = window.localStorage;
//
//    if (localStorage.getItem('userLoggedIn') === 'true') {
//        userLoggedIn = true;
//    }

class App extends Component {
    
    render() {
        return ( 
            <Landing / >
        );
    }
}

export default App;
