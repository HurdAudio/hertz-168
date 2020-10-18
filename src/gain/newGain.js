import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

function NewGain(audioContext) {
    
    let gain = {
        uuid: uuidv4(),
        dragging: false,
        gain: audioContext.createGain(),
        input: {
            connector: null,
            module: null,
            name: null,
            type: null
        },
        left: 550,
        modulationInput: {
            connector: null,
            module: null,
            name: null,
            type: null
        },
        mute: false,
        name: 'gain',
        output: {
            connector: null,
            module: null,
            name: null,
            type: null
        },
        top: 350,
        value: 0.4
    };
    gain.gain.gain.setValueAtTime(gain.value, audioContext.currentTime);
    
    return gain;
}

export default NewGain;