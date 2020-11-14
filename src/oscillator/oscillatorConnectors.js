import React from 'react';

function OscillatorConnectors(audioContext, outputModule, inputModule) {
    
    // connect oscillator to all other modules
    switch(inputModule.name) {
        case('gain'):
            if (outputModule.output.type === 'input') {
                outputModule.oscillator.connect(inputModule.gain);
            } else {
                outputModule.oscillator.connect(inputModule.gain.gain);
            }
            break;
        case('master volume'):
            outputModule.oscillator.connect(inputModule.gain);
            break;
        case('oscillator'):
            if (outputModule.output.type === 'frequencyModulationInput') {
                outputModule.oscillator.connect(inputModule.oscillator.frequency);
            } else if (outputModule.output.type === 'detuneModulationInput') {
                outputModule.oscillator.connect(inputModule.oscillator.detune);
            } else {
                // wave type - not a valid connection
            }
            break;
        default:
            console.log('ERROR - unsupported input module');
    }
}

export default OscillatorConnectors;