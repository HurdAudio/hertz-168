import React, { useState } from 'react';

function GainConnectors(audioContext, outputModule, inputModule) {
    
    // connect gain to all other modules
    switch(inputModule.name) {
        case('gain'):
            if (outputModule.output.type === 'input') {
                outputModule.gain.connect(inputModule.gain);
            } else {
                outputModule.gain.connect(inputModule.gain.gain);
            }
            break;
        case('master volume'):
            outputModule.gain.connect(inputModule.gain);
            break;
        case('oscillator'):
            if (outputModule.output.type === 'frequencyModulationInput') {
                outputModule.gain.connect(inputModule.oscillator.frequency);
            } else if (outputModule.output.type === 'detuneModulationInput') {
                outputModule.gain.connect(inputModule.oscillator.detune);
            } else {
                // wave type - not a valid connection
            }
            break;
        default:
            console.log('ERROR - unsupported input module');
    }
}

export default GainConnectors;