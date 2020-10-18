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
        default:
            console.log('ERROR - unsupported input module');
    }
}

export default GainConnectors;