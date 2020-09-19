import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import audio_157431_1280 from '../img/audio_157431_1280.png';
import './testbed.style.jana.css';
import '../masterVolume/masterVolume.style.jana.css';

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

let pos = {};
let audioContext = null;

function TestBed() {
    
    const [testbedMainStatus, setTestbedMainStatus] = useState('_Active');
    const [testbedMonth, setTestbedMonth] = useState('_JanuaryA');
    const [masterVolumeMonth, setMasterVolumeMonth] = useState('_JanuaryA');
    const [testbedModules, setTestbedModules] = useState([
        {
            uuid: 'f94152ad-b07b-48b4-989f-8b9dc063210c',
            dragging: false,
            gain: {
                gain: 0.4
            },
            left: 1150,
            mute: false,
            name: 'master volume',
            top: 450,
            value: 0.4
        }
    ]);
    
    const mouseDownOnHandle = (e, uuid) => {
        let deepCopy = [...testbedModules];        
        let index;
        
        if (e.button !== 0) {
            return;
        }
        
        for (let i = 0; i < deepCopy.length; i++) {
            if (testbedModules[i].uuid === uuid) {
                index = i;
            }
        }
        pos = {
            left: deepCopy[index].left - e.clientX,
            top: deepCopy[index].top - e.clientY
        };
        deepCopy[index].dragging = true;
        deepCopy[index].left = e.pageX + pos.left;
        deepCopy[index].top = e.pageY + pos.top;
        
        setTestbedModules(deepCopy);
        e.stopPropagation();
        e.preventDefault();
    }
    
    const mouseMoveOnHandle = (e, uuid) => {
        let deepCopy = [...testbedModules];
        let index; 
        for (let i = 0; i < deepCopy.length; i++) {
            if (testbedModules[i].uuid === uuid) {
                index = i;
            }
        }
        if (!deepCopy[index].dragging) {
            return;
        }
        
        deepCopy[index].left = e.pageX + pos.left;
        deepCopy[index].top = e.pageY + pos.top;
        setTestbedModules(deepCopy);
        e.stopPropagation();
        e.preventDefault();
    }
    
    const mouseUpOnHandle = (e, uuid) => {
        let deepCopy = [...testbedModules];
        let index; 
        for (let i = 0; i < deepCopy.length; i++) {
            if (testbedModules[i].uuid === uuid) {
                index = i;
            }
        }
        deepCopy[index].dragging = false;
        setTestbedModules(deepCopy);
        e.stopPropagation();
        e.preventDefault();
    }
    
    const setConnections = () => {
        let deepCopy = [...testbedModules];
        
        for (let i = 0; i < deepCopy.length; i++) {
            if (deepCopy[i].name === 'master volume') {
                deepCopy[i].gain = audioContext.createGain();
                deepCopy[i].gain.connect(audioContext.destination);
                deepCopy[i].gain.gain.setValueAtTime(deepCopy[i].value, audioContext.currentTime);
            }
        }
        
        setTestbedModules(deepCopy);
    }
    
    const checkForAudioContext = () => {
        if (audioContext === null) {
            audioContext = new AudioContext();
            setConnections();
        }
    }
    
    const updateMasterVolume = (val, uuid) => {
        let deepCopy = [...testbedModules];
        
        for (let i = 0; i < deepCopy.length; i++) {
            if (deepCopy[i].uuid === uuid) {
                deepCopy[i].value = val;
                if (!deepCopy[i].mute) {
                    deepCopy[i].gain.gain.setValueAtTime(deepCopy[i].value, audioContext.currentTime);
                }
            }
        }
        
        setTestbedModules(deepCopy);
    }
    
    const toggleMute = (uuid) => {
        let deepCopy = [...testbedModules];
        
        for (let i = 0; i < deepCopy.length; i++) {
            if (deepCopy[i].uuid === uuid) {
                deepCopy[i].mute = !deepCopy[i].mute;
                if (deepCopy[i].mute) {
                    deepCopy[i].gain.gain.setValueAtTime(0, audioContext.currentTime);
                } else {
                   deepCopy[i].gain.gain.setValueAtTime(deepCopy[i].value, audioContext.currentTime); 
                }
            }
        }
        
        setTestbedModules(deepCopy);
    }
    
    return(
        <div className={'testbedContainer' + testbedMainStatus + testbedMonth}
            onClick={() => checkForAudioContext()}>
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
                <div className={'testbedBed' + testbedMonth}>
                    {testbedModules.map(module => (
                        <div 
                            id={module.uuid}
                            key={module.uuid}>
                            {(module.name === 'master volume') && (
                                <div className={'masterVolumeContainer' + masterVolumeMonth}
                                    style={{ left: module.left.toString() + 'px', top: module.top.toString() + 'px'}}>
                                    <div className={'masterVolumeHandleTitle' + masterVolumeMonth}
                                        onMouseDown={(e) => mouseDownOnHandle(e, module.uuid)}
                                        onMouseMove={(e) => mouseMoveOnHandle(e, module.uuid)}
                                        onMouseUp={(e) => mouseUpOnHandle(e, module.uuid)}>
                                        <p className={'masterVolumeName' + masterVolumeMonth}>{module.name}</p>
                                    </div>
                                    <div className={'masterVolumePatchBay' + masterVolumeMonth}>
                                        <p className={'masterVolumeInputLabel' + masterVolumeMonth}>in</p>
                                        <div className={'masterVolumeInputDiv' + masterVolumeMonth}>
                                            <div className={'masterVolumeInputConnector' + masterVolumeMonth}></div>
                                        </div>
                                    </div>
                                    <div className={'masterVolumeDisplayDiv' + module.mute + masterVolumeMonth}>
                                        <input className={'masterVolumeDisplay' + module.mute + masterVolumeMonth}
                                            max="1"
                                            min="0"
                                            onChange={(e) => updateMasterVolume(e.target.value, module.uuid)}
                                            step="0.01"
                                            type="number"
                                            value={(Math.floor(module.value * 100) / 100).toFixed(2)}/>
                                    </div>
                                    <div className={'masterVolumeSliderDiv' + module.mute + masterVolumeMonth}>
                                        <input className={'masterVolumeRangeInput' + masterVolumeMonth}
                                            max="1"
                                            min="0"
                                            onChange={(e) => updateMasterVolume(e.target.value, module.uuid)}
                                            step="0.01"
                                            type="range"
                                            value={module.value}
                                            />
                                    </div>
                                    <div className={'masterVolumeMuteButtonDiv' + masterVolumeMonth}>
                                        <button className={'masterVolumeMuteButton' + module.mute + masterVolumeMonth}
                                            onClick={() => toggleMute(module.uuid)}>mute</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TestBed;