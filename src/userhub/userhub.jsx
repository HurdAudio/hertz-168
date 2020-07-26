import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './userhub.style.jana.css';
import './userhub.style.janb.css';
import TestBed from '../testbed/testbed';

let userhubFooterMessage = '';
let now = new Date();

if (now.getFullYear > 2020) {
    userhubFooterMessage = '©2020 - ' + now.getFullYear() + ' ';
} else {
    userhubFooterMessage = '©2020 ';
}
userhubFooterMessage += 'HurdAudio';

const userData = {
    avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
    name: 'Devin Hurd'
}

const janAVibration = 'https://hertz-168.s3.amazonaws.com/landing/january/vibration/sound_wave_frequency_vibration_hertz_pressure_pitch-512.png';
const janBVibration = 'https://hertz-168.s3.amazonaws.com/landing/january/vibration/aca6b497ffa33ed2ff03ac84be7a9678.jpg';

const placeholderMixer = [
    {
        uuid: 0,
        name: 'none'
    },
    {
        uuid: '4d500124-6fdb-4888-b3e6-1f36436ccf92',
        name: 'default'
    },
    {
        uuid: '97649c54-dd21-4a88-82b6-2eb827992162',
        name: 'drone base'
    },
    {
        uuid: 'e2103866-37ed-4dc4-a4de-284e742d8dd8',
        name: 'drone expander'
    },
    {
        uuid: '0bf906fb-8d62-4012-a458-e735009fc69f',
        name: 'hard limiter'
    },
    {
        uuid: '6b88494b-8612-49bb-addb-ed944657ff65',
        name: 'vocal compressor'
    }
];

const placeholderUserMixer = [
    {
        uuid: 'new',
        name: 'new'
    },
    {
        uuid: '4d500124-6fdb-4888-b3e6-1f36436ccf92',
        name: 'default'
    },
    {
        uuid: '97649c54-dd21-4a88-82b6-2eb827992162',
        name: 'drone base'
    },
    {
        uuid: 'e2103866-37ed-4dc4-a4de-284e742d8dd8',
        name: 'drone expander'
    },
    {
        uuid: '0bf906fb-8d62-4012-a458-e735009fc69f',
        name: 'hard limiter'
    },
    {
        uuid: '6b88494b-8612-49bb-addb-ed944657ff65',
        name: 'vocal compressor'
    }
];

const placeholderPatches = [
    {
        uuid: 'new',
        name: 'new'
    },
    {
        uuid: '397cd7c4-205d-49a7-8009-af456abd7099',
        name: 'glass xylophone'
    },
    {
        uuid: 'e776a94a-082d-4dfb-8f98-8d5dcef24960',
        name: 'plucked harmonica'
    },
    {
        uuid: '43293fcc-893f-48ff-a4f8-5cfa7cfc68d2',
        name: 'pythagorean comma experiment'
    },
    {
        uuid: '397cd7c4-205d-49a7-8009-af456abd7099',
        name: 'subharmonic bass'
    },
    {
        uuid: '0c731bc7-81b5-40dc-b95b-9920e77b22f1',
        name: 'toy guitar'
    }
];

const placeholderKeymaps = [
    {
        uuid: 'new', 
        name: 'new'
    },
    {
        uuid: '7ad7901c-7057-49e4-9826-1197c6681276',
        name: '5-limit EDO'
    },
    {
        uuid: '4ad8c895-d574-4b3a-88ec-4edda98e447f',
        name: 'inverted vibraphone'
    },
    {
        uuid: '0c121da8-f46d-4c4c-96fa-72f53d9f99fc',
        name: 'stretched octavist'
    },
    {
        uuid: '6a059cb6-f71f-4b26-86c8-eb48e701472c',
        name: 'tetrachordal fantasy'
    }
];

const placeholderCompositions = [
    {
        uuid: 'new',
        name: 'new'
    },
    {
        uuid: '19ed120a-27c6-48a9-a32d-609bb7ea2b7c',
        name: 'blurred reservoir'
    },
    {
        uuid: '55780860-c617-4949-bf11-80d23d81549b',
        name: 'low drone'
    },
    {
        uuid: '4f13d2a6-2401-450b-906f-5d538b351dcf',
        name: 'mid drone'
    },
    {
        uuid: '508584a4-b084-444a-b815-180c1537b89e',
        name: 'untitled'
    }
];

function UserHub() {
    
    const [hubMonth, setHubMonth] = useState('_JanuaryB');
    const [logoImage, setLogoImage] = useState(janBVibration);
    const [tabState, setTabState] = useState({
        compose: false,
        home: true,
        info: false,
        keymap: false,
        mixer: false,
        patch: false,
        social: false
    });
    const [mixerSelected, setMixerSelected] = useState(0);
    const [mixerSettingSelected, setMixerSettingSelected] = useState('new');
    const [userPatchSelected, setUserPatchSelected] = useState('new');
    const [userKeymapSelected, setUserKeymapSelected] = useState('new');
    const [userComposeSelected, setUserComposeSelected] = useState('new');
    
    const tabToHome = () => {
        setTabState({
            compose: false,
            home: true,
            info: false,
            keymap: false,
            mixer: false,
            patch: false,
            social: false
        });
    }
    
    const tabToMixer = () => {
        setTabState({
            compose: false,
            home: false,
            info: false,
            keymap: false,
            mixer: true,
            patch: false,
            social: false
        });
    }
    
    const tabToPatch = () => {
        setTabState({
            compose: false,
            home: false,
            info: false,
            keymap: false,
            mixer: false,
            patch: true,
            social: false
        });
    }
    
    const tabToKeymap = () => {
        setTabState({
            compose: false,
            home: false,
            info: false,
            keymap: true,
            mixer: false,
            patch: false,
            social: false
        });
    }
    
    const tabToCompose = () => {
        setTabState({
            compose: true,
            home: false,
            info: false,
            keymap: false,
            mixer: false,
            patch: false,
            social: false
        });
    }
    
    const tabToSocial = () => {
        setTabState({
            compose: false,
            home: false,
            info: false,
            keymap: false,
            mixer: false,
            patch: false,
            social: true
        });
    }
    
    const tabToInfo = () => {
        setTabState({
            compose: false,
            home: false,
            info: true,
            keymap: false,
            mixer: false,
            patch: false,
            social: false
        });
    }
    
    const changeUserMixer = (val) => {
        setMixerSelected(val);
    }
    
    const changeUserMixerSelection = (val) => {
        setMixerSettingSelected(val);
    }
    
    const updatePatch = (val) => {
        setUserPatchSelected(val);
    }
    
    const updateKeyMapping = (val) => {
        setUserKeymapSelected(val);
    }
    
    const updateCompose = (val) => {
        setUserComposeSelected(val);
    }
    
    const logOutScript = () => {
        let localStorage = window.localStorage;
        
        localStorage.clear();
        localStorage.setItem('vibratingAt168Hertz', false);
        window.location.reload(false);
    }
    
    return(
        <Router>
                <Switch>
                    <Route path="/testbed">
                        {TestBed()}
                    </Route>
                </Switch>
            <div className={'userHubContainer' + hubMonth}>
                <div className={'userHubImageDiv' + hubMonth}>
                    <div className={'userHubTopBar' + hubMonth}>
                        <img className={'userHubLogo' + hubMonth}
                            src={logoImage} />
                        <h1 className={'userHubTitle' + hubMonth}>168 Hertz</h1>
                        <div className={'userHubLoggedInUserDiv' + hubMonth}>
                            <p className={'userHubLoggedInUserLabel' + hubMonth}>logged in user:</p>
                            <img className={'userHubUserAvatar' + hubMonth} src={userData.avatar} />
                            <p className={'userHubLogedInUserName' + hubMonth}>{userData.name}</p>
                        </div>
                        <button className={'userHubLogoutButton' + hubMonth}
                            onClick={() => logOutScript()}>log out</button>
                    </div>
                    <div className={'userHubTabsBar' + hubMonth}>
                        <p className={'userHubHomeTab' + tabState.home + hubMonth}
                            onClick={() => tabToHome()}>home</p>
                        <p className={'userHubMixerTab' + tabState.mixer + hubMonth}
                            onClick={() => tabToMixer()}>mixer</p>
                        <p className={'userHubPatchTab' + tabState.patch + hubMonth}
                            onClick={() => tabToPatch()}>patch</p>
                        <p className={'userHubKeymapTab' + tabState.keymap + hubMonth}
                            onClick={() => tabToKeymap()}>keymap</p>
                        <p className={'userHubComposeTab' + tabState.compose + hubMonth}
                            onClick={() => tabToCompose()}>compose</p>
                        <p className={'userHubSocialTab' + tabState.social + hubMonth}
                            onClick={() => tabToSocial()}>social</p>
                        <p className={'userHubInfoTab' + tabState.info + hubMonth}
                            onClick={() => tabToInfo()}>info</p>
                    </div>
                    <span className={'userHubTabSpanner1' + tabState.home + tabState.mixer + tabState.patch + tabState.keymap + tabState.compose + tabState.social + tabState.info + hubMonth}></span>
                    <span className={'userHubTabSpanner2' + tabState.home + tabState.mixer + tabState.patch + tabState.keymap + tabState.compose + tabState.social + tabState.info + hubMonth}></span>
                    <span className={'userHubTabSpanner3' + tabState.home + tabState.mixer + tabState.patch + tabState.keymap + tabState.compose + tabState.social + tabState.info + hubMonth}></span>
                    <span className={'userHubTabSpanner4' + tabState.home + tabState.mixer + tabState.patch + tabState.keymap + tabState.compose + tabState.social + tabState.info + hubMonth}></span>
                    <span className={'userHubTabSpanner5' + tabState.home + tabState.mixer + tabState.patch + tabState.keymap + tabState.compose + tabState.social + tabState.info + hubMonth}></span>
                    <span className={'userHubTabSpanner6' + tabState.home + tabState.mixer + tabState.patch + tabState.keymap + tabState.compose + tabState.social + tabState.info + hubMonth}></span>
                    <span className={'userHubTabSpanner7' + tabState.home + tabState.mixer + tabState.patch + tabState.keymap + tabState.compose + tabState.social + tabState.info + hubMonth}></span>
                    <span className={'userHubTabSpanner8' + tabState.home + tabState.mixer + tabState.patch + tabState.keymap + tabState.compose + tabState.social + tabState.info + hubMonth}></span>
                    {(tabState.home) && (
                        <div className={'userHubHomeContainer' + hubMonth}>
                            <p className={'userHubHomeCurrentMixerLabel' + hubMonth}>current mixer:</p>
                            <select className={'userHubHomeMixerSelector' + hubMonth}
                                onChange={(e) => changeUserMixer(e.target.value)}
                                value={mixerSelected}>
                                {placeholderMixer.map(mixer => (
                                    <option key={mixer.uuid}>{mixer.name}</option>
                                    ))}
                            </select>
                            <Link className={'userHubTestbedLink' + hubMonth}
                                to="/testbed">
                                <button className={'userHubTestBedButton' + hubMonth}>test bed</button>
                            </Link>
                            <p className={'userHubHomeFooter' + hubMonth}>{userhubFooterMessage}</p>
                        </div>
                    )}
                    {(tabState.mixer) && (
                        <div className={'userHubMixerContainer' + hubMonth}>
                            <p className={'userHubMixerLabel' + hubMonth}>mixer:</p>
                            <select className={'userHubHomeMixerSelector' + hubMonth}
                                onChange={(e) => changeUserMixerSelection(e.target.value)}
                                value={mixerSettingSelected}>
                                {placeholderUserMixer.map(mixer => (
                                    <option key={mixer.uuid}>{mixer.name}</option>
                                    ))}
                            </select>
                            <button className={'userHubOpenMixEditorButton' + hubMonth}>edit</button>
                            {((mixerSettingSelected !== 'new') && (mixerSettingSelected !== mixerSelected)) && (
                                <button className={'userHubLoadMixerButton' + hubMonth}
                                    onClick={() => changeUserMixer(mixerSettingSelected)}>load</button>
                            )}
                            <button className={'mixerMarketplaceButton' + hubMonth}>mixer marketplace</button>
                            <p className={'userHubMixerFooter' + hubMonth}>{userhubFooterMessage}</p>
                        </div>
                    )}
                    {(tabState.patch) && (
                        <div className={'userHubPatchContainer' + hubMonth}>
                            <p className={'userHubMixerLabel' + hubMonth}>patch:</p>
                            <select className={'userHubHomeMixerSelector' + hubMonth}
                                onChange={(e) => updatePatch(e.target.value)}
                                value={userPatchSelected}>
                                {placeholderPatches.map(patch => (
                                    <option key={patch.uuid}>{patch.name}</option>
                                    ))}
                            </select>
                            <button className={'userHubOpenMixEditorButton' + hubMonth}>edit</button>
                            <button className={'mixerMarketplaceButton' + hubMonth}>patch marketplace</button>
                            <p className={'userHubPatchFooter' + hubMonth}>{userhubFooterMessage}</p>
                        </div>
                    )}
                    {(tabState.keymap) && (
                        <div className={'userHubKeymapContainer' + hubMonth}>
                            <p className={'userHubMixerLabel' + hubMonth}>keymap:</p>
                            <select className={'userHubHomeMixerSelector' + hubMonth}
                                onChange={(e) => updateKeyMapping(e.target.value)}
                                value={userKeymapSelected}>
                                {placeholderKeymaps.map(keys => (
                                    <option key={keys.uuid}>{keys.name}</option>
                                    ))}
                            </select>
                            <button className={'userHubOpenMixEditorButton' + hubMonth}>edit</button>
                            <button className={'mixerMarketplaceButton' + hubMonth}>km marketplace</button>
                            <p className={'userHubKeymapFooter' + hubMonth}>{userhubFooterMessage}</p>
                        </div>
                    )}
                    {(tabState.compose) && (
                        <div className={'userHubComposeContainer' + hubMonth}>
                            <p className={'userHubMixerLabel' + hubMonth}>compositions:</p>
                            <select className={'userHubHomeMixerSelector' + hubMonth}
                                onChange={(e) => updateCompose(e.target.value)}
                                value={userComposeSelected}>
                                {placeholderCompositions.map(comp => (
                                    <option key={comp.uuid}>{comp.name}</option>
                                    ))}
                            </select>
                            <button className={'userHubOpenMixEditorButton' + hubMonth}>edit</button>
                            <button className={'mixerMarketplaceButton' + hubMonth}>c marketplace</button>
                            <p className={'userHubComposeFooter' + hubMonth}>{userhubFooterMessage}</p>
                        </div>
                    )}
                    {(tabState.social) && (
                        <div className={'userHubSocialContainer' + hubMonth}>
                            <p className={'userHubMessageNotification' + hubMonth}>4 unread messages</p>
                            <p className={'userHubContactNotification' + hubMonth}>3 pending contact requests</p>
                            <p className={'userHubMessageCenterLink' + hubMonth}>message center</p>
                            <p className={'userHubContactsLink' + hubMonth}>manage contacts</p>
                            <p className={'userHubUserForumsLink' + hubMonth}>user forums</p>
                            <p className={'userHubBlogLink' + hubMonth}>168 Hertz Blog</p>
                            <img className={'userHubGitHubIcon' + hubMonth}
                                src="https://hertz-168.s3.amazonaws.com/userhub/icons/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f6769746875622e737667.svg" />
                            <img className={'userHubFacebookIcon' + hubMonth}
                                src="https://hertz-168.s3.amazonaws.com/userhub/icons/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f66616365626f6f6b2e737667.svg" />
                            <img className={'userHubInstagramIcon' + hubMonth}
                                src="https://hertz-168.s3.amazonaws.com/userhub/icons/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f696e7374616772616d2e737667.svg" />
                            <img className={'userHubRedditIcon' + hubMonth}
                                src="https://hertz-168.s3.amazonaws.com/userhub/icons/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f7265646469742e737667.svg" />
                            <img className={'userHubSoundcloudIcon' + hubMonth}
                                src="https://hertz-168.s3.amazonaws.com/userhub/icons/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f736f756e64636c6f75642e737667.svg" />
                            <img className={'userHubBandcampIcon' + hubMonth}
                                src="https://hertz-168.s3.amazonaws.com/userhub/icons/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f62616e6463616d702e737667.svg" />
                            <p className={'userHubSocialFooter' + hubMonth}>{userhubFooterMessage}</p>
                        </div>
                    )}
                    {(tabState.info) && (
                        <div className={'userHubInfoContainer' + hubMonth}>
                            <div className={'userHubInfoContentContainer' + hubMonth}>
                                <p className={'userHubInfoIntroductoryLine' + hubMonth}>168 Hertz is a Web-Audio API based application for building out synth patches and designing instruments.</p>
                                <p className={'userHubInfoContentContent' + hubMonth}>Instuments and patches are built out by connecting the inputs/outputs of a series of discreet modules. Collections of modules can then be routed through a mixer (which is itself constructed out of module units) and mapped across a key range triggered by MIDI inputs from an external device or sequencer. Additionally, patches can also be structured compositionally along a timeline that can also be triggered by external hardware.</p>
                                <p className={'userHubInfoContentHeader' + hubMonth}>Mixer</p>
                                <p className={'userHubInfoContentContent' + hubMonth}>The mixer controls the signal path from the input manager to the final speaker output. You cannot hear your sonic creations without a mixer, so mixer creation is a good place to start. This is a good place to apply compressors, equalization, limiters, and a master volume controller that ties your sound together.</p>
                                <p className={'userHubInfoContentHeader' + hubMonth}>Patch</p>
                                <p className={'userHubInfoContentContent' + hubMonth}>Patch references the collection of modules that manage a signal from its instantiation up to the input manager. This is where the creative sound design work is done. Oscillators and sampled waveform audio sources can be passed through or modulated by any number of modules.</p>
                                <p className={'userHubInfoContentHeader' + hubMonth}>Keymap</p>
                                <p className={'userHubInfoContentContent' + hubMonth}>The keymap is where a patch - or multiple sets of patches - are mapped out along a MIDI keyboard and velocity range. Individual notes can be set to user-defined frequency inputs (why be limited by traditional Western 12-tone-per-octave tuning?) and key velocity can be mapped to volume or even trigger completely different patches.</p>
                                <p className={'userHubInfoContentHeader' + hubMonth}>Compose</p>
                                <p className={'userHubInfoContentContent' + hubMonth}>Don't have access to a MIDI keyboard? No problem. The compose option allows you to structure temporal arrangements of patches triggered along a timeline. Do have access to a MIDI keyboard? You're in luck, individual composition objects can also be triggered by keyboard inputs just like patches are. Layer up your patches to realize youre masterpiece.</p>
                                <p className={'userHubInfoContentHeader' + hubMonth}>Social</p>
                                <p className={'userHubInfoContentContent' + hubMonth}>Have a sonic creation that you're proud of? Share it with other 168 Hertz users and fellow collaborators. Looking for inspiration? Have a browse through some of the mixer, patch, keymap, and composition marketplaces where users can swap, copy, and adapt existing assets for their own needs.</p>
                                <p className={'userHubInfoContentContent' + hubMonth}>Additionally, you can build out your own set of contacts of like-minded collaborators. Or check out the user forum and 168 Hertz Blog to keep up with recent activity.</p>
                                <p className={'userHubInfoIntroductoryLine' + hubMonth}>Modules</p><br />
                                <p className={'userHubInfoContentHeader' + hubMonth}>Master Volume</p>
                                <p className={'userHubInfoContentContent' + hubMonth}>Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.</p>
                                <p className={'userHubInfoIntroductoryLine' + hubMonth}>Additional Information</p><br />
                                <p className={'userHubInfoContentContent' + hubMonth}>168 Hertz is a HurdAudio production. All design, development, testing, and deployment by Devin Hurd.</p>
                            </div>
                            <p className={'userHubInfoFooter' + hubMonth}>{userhubFooterMessage}</p>
                        </div>
                    )}
                </div>
            </div>
        </Router>
        );
}

export default UserHub;