import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import audio_157431_1280 from '../img/audio_157431_1280.png';
import './testbed.style.jana.css';

const modules = [
    {
        uuid: '05cf98b0-1b95-4f9c-b592-d3aca85b1510',
        name: 'compressor'
    },
    {
        uuid: '36eeb817-c015-4ebc-bc21-b20843b3bdf4',
        name: 'gain'
    },
    {
        uuid: 'd0d176df-7e65-4b19-83f3-a8d3de1fff74',
        name: 'oscillator'
    },
    {
        uuid: '55c476c0-c55d-46cd-8525-463dc9ef0de3',
        name: 'test tone'
    }
];

function TestBed() {
    
    const [testbedMainStatus, setTestbedMainStatus] = useState('_Active');
    const [testbedMonth, setTestbedMonth] = useState('_JanuaryA');
    
    return(
        <div className={'testbedContainer' + testbedMainStatus + testbedMonth}>
            <div className={'testbedImageDiv' + testbedMonth}>
                <div className={'testbedTopBar' + testbedMonth}>
                    <NavLink className={'testbedNav' + testbedMonth} to="/">
                        <img className={'testbedNavIcon' + testbedMonth}
                            src={audio_157431_1280} />
                    </NavLink>
                    <p className={'testbedTitle' + testbedMonth}>Testbed</p>
                    <p className={'testbedModuleSelectLabel' + testbedMonth}>module select:</p>
                    <select className={'testbedModuleSelect' + testbedMonth}>
                        {modules.map(mod => (
                            <option key={mod.uuid} value={mod.uuid}>{mod.name}</option>
                        ))}
                    </select>
                    <button className={'testbedAddModule' + testbedMonth}>&#43;</button>
                </div>
                <div className={'testbedBed' + testbedMonth}></div>
            </div>
        </div>
    )
}

export default TestBed;