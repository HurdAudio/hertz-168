import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import audio_157431_1280 from '../img/audio_157431_1280.png';
import './testbed.style.jana.css';
import './testbed.style.janb.css';
import './testbed.style.janc.css';
import '../masterVolume/masterVolume.style.jana.css';
import '../masterVolume/masterVolume.style.janb.css';
import '../gain/gain.style.jana.css';
import '../gain/gain.style.janb.css';
import '../oscillator/oscillator.style.jana.css';
import NewGain from '../gain/newGain';
import NewOscillator from '../oscillator/newOscillator';
import GainConnectors from '../gain/gainConnectors';
import GainDisonnectors from '../gain/gainDisconnectors';
import OscillatorConnectors from '../oscillator/oscillatorConnectors';
import OscillatorDisconnectors from '../oscillator/oscillatorDisconnectors';
import { v4 as uuidv4 } from 'uuid';

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

const patchColors = [
    '#90F1EF',
    '#FFD6E0',
    '#FFEF9F',
    '#C1FBA4',
    '#7BF1A8',
    '#FFE74C',
    '#FF5964',
    '#FFFFFF',
    '#38618C',
    '#35A7FF',
    '#FB6107',
    '#F3DE2C',
    '#7CB518',
    '#5C8001',
    '#FBB02D'
];
const strokeWidth = 15;

let pos = {};
let audioContext = null;

function TestBed() {
    
    const [testbedMainStatus, setTestbedMainStatus] = useState('_Active');
    const [testbedMonth, setTestbedMonth] = useState('_JanuaryC');
    const [masterVolumeMonth, setMasterVolumeMonth] = useState('_JanuaryB');
    const [gainMonth, setGainMonth] = useState('_JanuaryB');
    const [oscillatorMonth, setOscillatorMonth] = useState('_JanuaryA');
    const [selectedModule, setSelectedModule] = useState('36eeb817-c015-4ebc-bc21-b20843b3bdf4');
    const [connectors, setConnectors] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0});
    const [userConnection, setUserConnection] = useState({
        activeConnectorState: false,
        connector: null,
        input: {
            element: null,
            module: null,
            name: null,
            type: null
        },
        output: {
            element: null,
            module: null,
            name: null,
            type: null
        }
    });
    const [testbedModules, setTestbedModules] = useState([
        {
            uuid: 'f94152ad-b07b-48b4-989f-8b9dc063210c',
            dragging: false,
            gain: {
                gain: 0.4
            },
            input: {
                connector: null,
                module: null,
                name: null,
                type: null
            },
            left: 1150,
            mute: false,
            name: 'master volume',
            top: 450,
            value: 0.4
        }
    ]);
    
    const updateMousePosition = (event) => {
        let positionCopy = {...mousePosition};
        
        if ((event.pageX !== null) && (event.pageY !== null)) {
            positionCopy.x = event.pageX;
            positionCopy.y = event.pageY;
        }
        setMousePosition(positionCopy);
    }
    
    const eliminateModule = (index) => {
        let deepCopy = [...testbedModules];
        
        deepCopy.splice(index, 1);
        
        setTestbedModules(deepCopy);
    }
    
    const moduleClearConnect = (module) => {
        if (module.input !== undefined) {
            if (module.input.connector !== null) {
                return false;
            }
        }
        if (module.modulationInput !== undefined) {
            if (module.modulationInput.connector !== null) {
                return false;
            }
        }
        if (module.output !== undefined) {
            if (module.output.connector !== null) {
                return false;
            }
        }
        if (module.modulationOutput !== undefined) {
            if (module.modulationOutput.connector !== null) {
                return false;
            }
        }
        return true;
    }
    
    const removeComponent = (uuid) => {
        let deepCopy = [...testbedModules];
        let index = null;
        let connectorIndex = [];
        
        for (let i = 0; i < deepCopy.length; i++) {
            if (deepCopy[i].uuid === uuid) {
                index = i;
            }
        }
        
        if (index === null) {
            return;
        }
        if (deepCopy[index].input !== undefined) {
            if (deepCopy[index].input.connector !== null) {
                connectorIndex.push(deepCopy[index].input.connector);
            }
        }
        if (deepCopy[index].modulationInput !== undefined) {
            if (deepCopy[index].modulationInput.connector !== null) {
                connectorIndex.push(deepCopy[index].modulationInput.connector);
            }
        }
        if (deepCopy[index].output !== undefined) {
            if (deepCopy[index].output.connector !== null) {
                connectorIndex.push(deepCopy[index].output.connector);
            }
        }
        if (deepCopy[index].modulationOutput !== undefined) {
            if (deepCopy[index].modulationOutput.connector !== null) {
                connectorIndex.push(deepCopy[index].modulationOutput.connector);
            }
        }
        connectorIndex.forEach(con => {
            disconnectConnect(con);
        });
        deepCopy.splice(index, 1);
        setTestbedModules(deepCopy);
    }
    
    const changeSelectedModule = (val) => {
        setSelectedModule(val);
    }
    
    const addSelectedModule = () => {
        let deepCopy = [...testbedModules];
        
        switch(selectedModule) {
            case('05cf98b0-1b95-4f9c-b592-d3aca85b1510'):
                console.log(deepCopy);
                break;
            case('36eeb817-c015-4ebc-bc21-b20843b3bdf4'):
                deepCopy.push(NewGain(audioContext));
                break;
            case('d0d176df-7e65-4b19-83f3-a8d3de1fff74'):
                deepCopy.push(NewOscillator(audioContext));
                break;
            default:
                console.log('ERROR - unsupported module');
        }
        
        setTestbedModules(deepCopy);
    }
    
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
            if (deepCopy[i].name === 'gain') {
                deepCopy[i].gain = audioContext.createGain();
                deepCopy[i].gain.gain.setValueAtTime(deepCopy[i].value, audioContext.currentTime);
            }
        }
        
        setTestbedModules(deepCopy);
    }
    
    const disconnectActiveConnect = () => {
        let deepCopy = {...userConnection};
        let deepConnections = [...connectors];
        let index = null;
        
        for (let i = 0; i < deepConnections.length; i++) {
            if (deepConnections[i].uuid === deepCopy.connector) {
                index = i;
            }
        }
        deepConnections.splice(index, 1);
        deepCopy.activeConnectorState = false;
        deepCopy.connector = null;
        deepCopy.input = {
            element: null,
            module: null,
            name: null
        };
        deepCopy.output = {
            element: null,
            module: null,
            name: null
        };
        
        setUserConnection(deepCopy);
        setConnectors(deepConnections);
    }
    
    const checkForAudioContext = () => {
        if (audioContext === null) {
            audioContext = new AudioContext();
            setConnections();
        }
        if (userConnection.activeConnectorState) {
            disconnectActiveConnect();
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
    
    const updateOscillatorFrequency = (val, uuid) => {
        let deepCopy = [...testbedModules];
        
        for (let i = 0; i < deepCopy.length; i++) {
            if (deepCopy[i].uuid === uuid) {
                deepCopy[i].frequency = val;
                deepCopy[i].oscillator.frequency.setValueAtTime(deepCopy[i].frequency, audioContext.currentTime);
            }
        }
        setTestbedModules(deepCopy);
    }
    
    const updateOscillatorDetune = (val, uuid) => {
        let deepCopy = [...testbedModules];
        
        for (let i = 0; i < deepCopy.length; i++) {
            if (deepCopy[i].uuid === uuid) {
                deepCopy[i].detune = val;
                deepCopy[i].oscillator.detune.setValueAtTime(deepCopy[i].detune, audioContext.currentTime);
            }
        }
        setTestbedModules(deepCopy);
    }
    
    const updateOscillatorType = (val, uuid) => {
        let deepCopy = [...testbedModules];
        
        for (let i = 0; i < deepCopy.length; i++) {
            if (deepCopy[i].uuid === uuid) {
                deepCopy[i].type = val;
                deepCopy[i].oscillator.type = deepCopy[i].type;
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
    
    const getX = (element) => {
        if (element.element === 'cursor') {
            return mousePosition.x;
        } else {
            const rect = element.element.getBoundingClientRect();
            return(rect.x + (rect.width / 2));
        }
    }
    
    const getY = (element) => {
        if (element.element === 'cursor') {
            return (mousePosition.y - (document.getElementById('testbedTopBar').getBoundingClientRect().height));
        } else {
            const rect = element.element.getBoundingClientRect();
            return(rect.y + (rect.height / 2) - (document.getElementById('testbedTopBar').getBoundingClientRect().height)); 
        }
    }
    
    const calculateLength = (x1, y1, x2, y2) => {
        if (x1 > x2) {
            if (y1 > y2) {
                return(Math.sqrt((Math.pow(x1 - x2, 2)) + (Math.pow(y1 - y2, 2))));
            } else {
                return(Math.sqrt((Math.pow(x1 - x2, 2)) + (Math.pow(y2 - y1, 2))));
            }
        } else if (x1 < x2) {
            if (y1 > y2) {
               return(Math.sqrt((Math.pow(x2 - x1, 2)) + (Math.pow(y1 - y2, 2)))); 
            } else {
                return(Math.sqrt((Math.pow(x2 - x1, 2)) + (Math.pow(y2 - y1, 2))));
            }
        }
    }
    
    const getCurveX = (outputEl, inputEl) => {
        const x1 = getX(outputEl);
        const x2 = getX(inputEl);
        
        if (x1 > x2) {
            return(x1 - ((x1 - x2)/2));
        } else if (x1 < x2) {
            return(x2 - ((x2 - x1)/2));
        } else if (x1 === x2) {
            return x1;
        }
    }
    
    const getCurveY = (outputEl, inputEl) => {
        const x1 = getX(outputEl);
        const x2 = getX(inputEl);
        const y1 = getY(outputEl);
        const y2 = getY(inputEl);
        const distance = calculateLength(x1, y1, x2, y2);
        
        if (y1 > y2) {
            return (y1 + 250 + (250 * (20/distance)));
        } else {
            return (y2 + 250 + (250 * (20/distance)));
        }
    }
    
    const connectValidModules = (leadConnection) => {
        let deepCopy = [...testbedModules];
        let inputIndex, outputIndex;
        
        for (let i = 0; i < deepCopy.length; i++) {
            if (leadConnection.input.module === deepCopy[i].uuid) {
                inputIndex = i;
            }
            if (leadConnection.output.module === deepCopy[i].uuid) {
                outputIndex = i;
            }
        }
        
        deepCopy[outputIndex][leadConnection.output.type].connector = leadConnection.uuid;
        deepCopy[outputIndex][leadConnection.output.type].module = deepCopy[inputIndex].uuid;
        deepCopy[outputIndex][leadConnection.output.type].name = deepCopy[inputIndex].name;
        deepCopy[outputIndex][leadConnection.output.type].type = leadConnection.input.type;
        
        deepCopy[inputIndex][leadConnection.input.type].connector = leadConnection.uuid;
        deepCopy[inputIndex][leadConnection.input.type].module = deepCopy[outputIndex].uuid;
        deepCopy[inputIndex][leadConnection.input.type].name = deepCopy[outputIndex].name;
        deepCopy[inputIndex][leadConnection.input.type].type = leadConnection.output.type;
        
        switch(leadConnection.output.name) {
            case('gain'):
                GainConnectors(audioContext, deepCopy[outputIndex], deepCopy[inputIndex]);
                break;
            case('oscillator'):
                OscillatorConnectors(audioContext, deepCopy[outputIndex], deepCopy[inputIndex]);
                break;
            default:
                console.log('ERROR - Unsupported connector output type');
        }
        
        setTestbedModules(deepCopy);
    }
    
    const removeSelectedConnection = (uuid) => {
        let deepCopy = [...connectors];
        let index = null;
        
        for (let i = 0; i < deepCopy.length; i++) {
            if (deepCopy[i].uuid === uuid) {
                index = i;
            }
        }
        
        if (index !== null) {
            deepCopy.splice(index, 1);
        }
        
        setConnectors(deepCopy);
    }
    
    const disconnectConnect = (con) => {
        let deepCopy = [...testbedModules];
        let deepConnect = [...connectors];
        let index;
        let nameHolder = '';
        let nameIndex;
        
        console.log(deepConnect);
        console.log(con);
        
        for (let i = 0; i < deepConnect.length; i++) {
            if (deepConnect[i].uuid === con) {
                index = i;
            }
        }
        console.log(index);
        nameHolder = deepConnect[index].input.name;
        
        for (let j = 0; j < deepCopy.length; j++) {
            if (deepCopy[j].uuid === deepConnect[index].input.module) {
                nameIndex = j;
                deepCopy[j][deepConnect[index].input.type] = {
                    connector: null,
                    module: null,
                    name: null,
                    type: null
                }
            }
            if (deepCopy[j].uuid === deepConnect[index].output.module) {
                deepCopy[j][deepConnect[index].output.type] = {
                    connector: null,
                    module: null,
                    name: null,
                    type: null
                }
            }
        }
        switch(nameHolder) {
            case('gain'):
                GainDisonnectors(audioContext, deepCopy[nameIndex]);
                break;
            case('oscillator'):
                OscillatorDisconnectors(audioContext, deepCopy[nameIndex]);
                break;
            default:
                console.log('ERROR - bad disconnection');
        }

        setConnectors(deepConnect);
        
        setTestbedModules(deepCopy);
        
        removeSelectedConnection(con);
        
    }
    
    const connectModule = (type, uuid, element, name, event) => {
        let deepCopy = {...userConnection};
        let connectorCopy = [...connectors];
        let connection;
        let index;
        event.stopPropagation();
        // connect output -> input
        
        // Check for existing connector
        for (let i = 0; i < testbedModules.length; i++) {
            if (testbedModules[i].uuid === uuid) {
                index = i;
            }
        }
        if (deepCopy.activeConnectorState) {
            if (testbedModules[index][type].connector !== null) {
                disconnectActiveConnect();
                return;
            }
        } else {
            if (testbedModules[index][type].connector !== null) {
                disconnectConnect(testbedModules[index][type].connector);
                return;
            }
        }
        // If existing && activeConnectorState is true then disconnect active only
        // else disconnect connection and return
        
        if (deepCopy.activeConnectorState) {
            if ((type === 'output') || (type === 'modulationOutput')) {
                if (deepCopy.input.module === uuid) {
                    disconnectActiveConnect();
                    return;
                }
                for (let i = 0; i < connectorCopy.length; i++) {
                    if (connectorCopy[i].uuid === deepCopy.connector) {
                        index = i;
                    }
                }
                connectorCopy[index].output.element = document.getElementById(element);
                connectorCopy[index].output.module = uuid;
                connectorCopy[index].output.name = name;
                connectorCopy[index].output.type = type;
                deepCopy.activeConnectorState = false;
                connectValidModules(connectorCopy[index]);
            } else if ((type === 'input') || (type === 'modulationInput') || (type === 'frequencyModulationInput') || (type === 'detuneModulationInput') || (type === 'typeModulationInput')) {
                if (deepCopy.output.module === uuid) {
                    disconnectActiveConnect();
                    return;
                }
                for (let i = 0; i < connectorCopy.length; i++) {
                    if (connectorCopy[i].uuid === deepCopy.connector) {
                        index = i;
                    }
                }
                connectorCopy[index].input.element = document.getElementById(element);
                connectorCopy[index].input.module = uuid;
                connectorCopy[index].input.name = name;
                connectorCopy[index].input.type = type;
                deepCopy.activeConnectorState = false;
                connectValidModules(connectorCopy[index]);
            }
            // connect valid connection
        } else {
            if ((type === 'output') || (type === 'modulationOutput')) {
                deepCopy.activeConnectorState = true;
                deepCopy.connector = uuidv4();
                deepCopy.output.element = document.getElementById(element);
                deepCopy.output.module = uuid;
                deepCopy.output.name = name;
                connection = {
                    uuid: deepCopy.connector,
                    color: patchColors[Math.floor(Math.random() * patchColors.length)],
                    input: {
                        element: 'cursor',
                        module: null,
                        name: null,
                        type: null
                    },
                    isActiveConnector: true,
                    output: {
                        element: deepCopy.output.element,
                        module: deepCopy.output.module,
                        name: deepCopy.output.name,
                        type: type
                    },
                    width: strokeWidth
                }
                connectorCopy.push(connection);
            } else if ((type === 'input') || (type === 'modulationInput')) {
                deepCopy.activeConnectorState = true;
                deepCopy.connector = uuidv4();
                deepCopy.input.element = document.getElementById(element);
                deepCopy.input.module = uuid;
                deepCopy.input.name = name;
                connection = {
                    uuid: deepCopy.connector,
                    color: patchColors[Math.floor(Math.random() * patchColors.length)],
                    input: {
                        element: deepCopy.input.element,
                        module: deepCopy.input.module,
                        name: deepCopy.input.name,
                        type: type
                    },
                    isActiveConnector: true,
                    output: {
                        element: 'cursor',
                        module: null,
                        name: null,
                        type: null
                    },
                    width: strokeWidth
                };
                connectorCopy.push(connection);
            }
        }
        
        setUserConnection(deepCopy);
        setConnectors(connectorCopy);
    }
    
    return(
        <div className={'testbedContainer' + testbedMainStatus + testbedMonth}
            onClick={() => checkForAudioContext()}
            onMouseMove={(e) => updateMousePosition(e)}>
            <div className={'testbedImageDiv' + testbedMonth}>
                <div className={'testbedTopBar' + testbedMonth}
                    id="testbedTopBar">
                    <NavLink className={'testbedNav' + testbedMonth} to="/">
                        <img className={'testbedNavIcon' + testbedMonth}
                            src={audio_157431_1280} />
                    </NavLink>
                    <p className={'testbedTitle' + testbedMonth}>Testbed</p>
                    <p className={'testbedModuleSelectLabel' + testbedMonth}>module select:</p>
                    <select className={'testbedModuleSelect' + testbedMonth}
                        onChange={(e) => changeSelectedModule(e.target.value)}
                        value={selectedModule}>
                        {modules.map(mod => (
                            <option key={mod.uuid} value={mod.uuid}>{mod.name}</option>
                        ))}
                    </select>
                    <button className={'testbedAddModule' + testbedMonth}
                        onClick={() => addSelectedModule()}>&#43;</button>
                </div>
                <div className={'testbedBed' + testbedMonth}>
                    {testbedModules.map(module => (
                        <div 
                            id={module.uuid}
                            key={module.uuid}>
                            {(module.name === 'gain') && (
                                <div className={'gainContainer' + gainMonth}
                                    style={{ left: module.left.toString() + 'px', top: module.top.toString() + 'px'}}>
                                    <div className={'gainHandleTitle' + gainMonth}
                                        onMouseDown={(e) => mouseDownOnHandle(e, module.uuid)}
                                        onMouseMove={(e) => mouseMoveOnHandle(e, module.uuid)}
                                        onMouseUp={(e) => mouseUpOnHandle(e, module.uuid)}>
                                        <p className={'gainName' + gainMonth}>{module.name}</p>
                                    </div>
                                    <p className={'gainDelete' + gainMonth}
                                        onClick={() => removeComponent(module.uuid)}>☒</p>
                                    <div className={'gainPatchBay' + gainMonth}>
                                        <p className={'gainInputLabel' + gainMonth}>in</p>
                                        <div className={'gainInputDiv' + gainMonth}>
                                            <div className={'gainInputConnector' + gainMonth}
                                                id={'input' + module.uuid}
                                                onClick={(e) => connectModule('input', module.uuid, 'input' + module.uuid, module.name, e)}>
                                            </div>
                                        </div>
                                        <p className={'gainOutputLabel' + gainMonth}>out</p>
                                        <div className={'gainInputDiv' + gainMonth}>
                                            <div className={'gainInputConnector' + gainMonth}
                                                id={'output' + module.uuid}
                                                onClick={(e) => connectModule('output', module.uuid, 'output' + module.uuid, module.name, e)}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'gainDisplayDiv' + gainMonth}>
                                        <input className={'gainDisplay' + gainMonth}
                                            max="1"
                                            min="0"
                                            onChange={(e) => updateMasterVolume(e.target.value, module.uuid)}
                                            step="0.01"
                                            type="number"
                                            value={(Math.floor(module.value * 100) / 100).toFixed(2)}/>
                                    </div>
                                    <div className={'gainSliderDiv' + gainMonth}>
                                        <input className={'gainRangeInput' + gainMonth}
                                            max="1"
                                            min="0"
                                            onChange={(e) => updateMasterVolume(e.target.value, module.uuid)}
                                            step="0.01"
                                            type="range"
                                            value={module.value}
                                            />
                                    </div>
                                    <div className={'gainModulateDiv' + gainMonth}>
                                        <p className={'gainModulationInputLabel' + gainMonth}>modulation input</p>
                                        <div className={'gainModulationInputDiv' + gainMonth}>
                                            <div className={'gainModulationInputConnector' + gainMonth}
                                                id={'modulationInput' + module.uuid}
                                                onClick={(e) => connectModule('modulationInput', module.uuid, 'modulationInput' + module.uuid, module.name, e)}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(module.name === 'oscillator') && (
                                <div className={'oscillatorContainer' + oscillatorMonth}
                                    style={{ left: module.left.toString() + 'px', top: module.top.toString() + 'px', zIndex: '2'}}>
                                    <div className={'oscillatorHandleTitle' + oscillatorMonth}
                                        onMouseDown={(e) => mouseDownOnHandle(e, module.uuid)}
                                        onMouseMove={(e) => mouseMoveOnHandle(e, module.uuid)}
                                        onMouseUp={(e) => mouseUpOnHandle(e, module.uuid)}>
                                        <p className={'oscillatorName' + oscillatorMonth}>{module.name}</p>
                                    </div>
                                    <p className={'oscillatorDelete' + oscillatorMonth}
                                        onClick={() => removeComponent(module.uuid)}>☒</p>
                                    <div className={'oscillatorPatchBay' + oscillatorMonth}>
                                        <p className={'oscillatorOutputLabel' + oscillatorMonth}>out</p>
                                        <div className={'oscillatorOutputDiv' + oscillatorMonth}>
                                            <div className={'oscillatorOutputConnector' + oscillatorMonth}
                                                id={'output' + module.uuid}
                                                onClick={(e) => connectModule('output', module.uuid, 'output' + module.uuid, module.name, e)}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'oscillatorFrequencyDisplayDiv' + oscillatorMonth}>
                                        <p className={'oscillatorFrequencyLabel' + oscillatorMonth}>hertz:</p>
                                        <input className={'oscillatorFrequencyDisplay' + oscillatorMonth}
                                            max="22000.000"
                                            min="0.001"
                                            onChange={(e) => updateOscillatorFrequency(e.target.value, module.uuid)}
                                            step="0.001"
                                            type="number"
                                            value={parseFloat(module.frequency).toFixed(3)}/>
                                    </div>
                                    <div className={'oscillatorFrequencyModulationInputDiv' + oscillatorMonth}>
                                        <p className={'oscillatorFrequencyModulationInputLabel' + oscillatorMonth}>modulation:</p>
                                        <p className={'oscillatorFrequencyModulationInputInLabel' + oscillatorMonth}>in</p>
                                        <div className={'oscillatorFrequencyModulationInputConnectorDiv' + oscillatorMonth}>
                                            <div className={'oscillatorOutputConnector' + oscillatorMonth}
                                                id={'frequencyModulationInput' + module.uuid}
                                                onClick={(e) => connectModule('frequencyModulationInput', module.uuid, 'frequencyModulationInput' + module.uuid, module.name, e)}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'oscillatorFrequencySliderDiv' + oscillatorMonth}>
                                        <input className={'oscillatorFrequencyRangeInput' + oscillatorMonth}
                                            max="22000.000"
                                            min="0.001"
                                            onChange={(e) => updateOscillatorFrequency(e.target.value, module.uuid)}
                                            step="0.001"
                                            type="range"
                                            value={module.frequency}
                                            />
                                    </div>
                                    <div className={'oscillatorDetuneDiv' + oscillatorMonth}>
                                        <p className={'oscillatorDetuneLabel' + oscillatorMonth}>detune</p>
                                        <p className={'oscillatorDetuneCentsLabel' + oscillatorMonth}>cents:</p>
                                        <input className={'oscillatorDetuneDetuneDisplayInput' + oscillatorMonth}
                                            max="100.00"
                                            min="-100.00"
                                            onChange={(e) => updateOscillatorDetune(e.target.value, module.uuid)}
                                            step="0.01" 
                                            type="number"
                                            value={parseFloat(module.detune).toFixed(2)}/>
                                        <p className={'oscillatorDetuneModulateInputLabel' + oscillatorMonth}>in</p>
                                        <div className={'oscillatorDetuneModulationInputConnectorDiv' + oscillatorMonth}>
                                            <div className={'oscillatorOutputConnector' + oscillatorMonth}
                                                id={'detuneModulationInput' + module.uuid}
                                                onClick={(e) => connectModule('detuneModulationInput', module.uuid, 'detuneModulationInput' + module.uuid, module.name, e)}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'oscillatorDetuneSliderDiv' + oscillatorMonth}>
                                        <input className={'oscillatorDetuneSlider' + oscillatorMonth}
                                            max="100.00"
                                            min="-100.00"
                                            onChange={(e) => updateOscillatorDetune(e.target.value, module.uuid)}
                                            step="0.01"
                                            type="range"
                                            value={module.detune}
                                            />
                                    </div>
                                    <div className={'oscillatorWavetypeDiv' + oscillatorMonth}>
                                        <p className={'oscillatorTypeLabel' + oscillatorMonth}>type</p>
                                        <select className={'oscillatorTypeSelector' + oscillatorMonth}
                                            onChange={(e) => updateOscillatorType(e.target.value, module.uuid)}
                                            value={module.type}>
                                            <option value="sine">sine</option>
                                            <option value="square">square</option>
                                            <option value="sawtooth">sawtooth</option>
                                            <option value="triangle">triangle</option>
                                        </select>
                                        <p className={'oscillatorDetuneModulateInputLabel' + oscillatorMonth}>in</p>
                                        <div className={'oscillatorDetuneModulationInputConnectorDiv' + oscillatorMonth}>
                                            <div className={'oscillatorOutputConnector' + oscillatorMonth}
                                                id={'typeModulationInput' + module.uuid}
                                                onClick={(e) => connectModule('typeModulationInput', module.uuid, 'typeModulationInput' + module.uuid, module.name, e)}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(module.name === 'master volume') && (
                                <div className={'masterVolumeContainer' + masterVolumeMonth}
                                    style={{ left: module.left.toString() + 'px', top: module.top.toString() + 'px', zIndex: '2'}}>
                                    <div className={'masterVolumeHandleTitle' + masterVolumeMonth}
                                        onMouseDown={(e) => mouseDownOnHandle(e, module.uuid)}
                                        onMouseMove={(e) => mouseMoveOnHandle(e, module.uuid)}
                                        onMouseUp={(e) => mouseUpOnHandle(e, module.uuid)}>
                                        <p className={'masterVolumeName' + masterVolumeMonth}>{module.name}</p>
                                    </div>
                                    <div className={'masterVolumePatchBay' + masterVolumeMonth}>
                                        <p className={'masterVolumeInputLabel' + masterVolumeMonth}>in</p>
                                        <div className={'masterVolumeInputDiv' + masterVolumeMonth}>
                                            <div className={'masterVolumeInputConnector' + masterVolumeMonth}
                                                id={'input' + module.uuid}
                                                onClick={(e) => connectModule('input', module.uuid, 'input' + module.uuid, module.name, e)}></div>
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
                    <svg 
                        height="100%"
                        style={{ pointerEvents: 'none', position: 'relative', zIndex: 5}}
                        width="100%">
                        {connectors.map(lead => (
                            <path 
                                d={'M ' + getX(lead.output) + ' ' + getY(lead.output) + ' Q ' + getCurveX(lead.output, lead.input) + ' ' + getCurveY(lead.output, lead.input) + ' ' + getX(lead.input) + ' ' + getY(lead.input)}
                                fill="none"
                                key={lead.uuid}
                                stroke={lead.color}
                                strokeLinecap="round"
                                strokeWidth={lead.width}>
                            </path>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default TestBed;