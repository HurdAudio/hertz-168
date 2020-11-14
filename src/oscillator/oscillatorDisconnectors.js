import React from 'react';

function OscillatorDisconnectors(audioContext, osc) {
    
    osc.oscillator.disconnect();
    
}

export default OscillatorDisconnectors;