import React, { useState } from 'react';

function GainDisonnectors(audioContext, gain) {
    
    gain.gain.disconnect();
    
}

export default GainDisonnectors;