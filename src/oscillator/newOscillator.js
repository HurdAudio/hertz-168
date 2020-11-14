import React from 'react';

import { v4 as uuidv4 } from 'uuid';

function NewOscillator(audioContext) {
    
    let osc = {
        uuid: uuidv4(),
        detune: 0,
        detuneModulationInput: {
            connector: null,
            module: null,
            name: null,
            type: null
        },
        dragging: false,
        frequency: 440,
        frequencyModulationInput: {
            connector: null,
            module: null,
            name: null,
            type: null
        },
        input: {
            connector: null,
            module: null,
            name: null,
            type: null
        },
        left: 550,
        name: 'oscillator',
        oscillator: audioContext.createOscillator(),
        output: {
            connector: null,
            module: null,
            name: null,
            type: null
        },
        top: 350,
        type: 'sine',
        typeModulationInput: {
            connector: null,
            module: null,
            name: null,
            type: null
        },
        value: 0.4
    };
    osc.oscillator.detune.setValueAtTime(osc.detune, audioContext.currentTime);
    osc.oscillator.frequency.setValueAtTime(osc.frequency, audioContext.currentTime);
    osc.oscillator.type = osc.type;
    osc.oscillator.start();
    
    return osc;
}

export default NewOscillator;