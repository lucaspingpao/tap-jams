import React from 'react'
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../../../styles/Rhythm.css';

import Snare from '../../../assets/images/Snare.jpeg';

function Drum(props) {
    const handleChange = (event) => {
        let soundsCopy = {...props.allSounds}
        soundsCopy[props.instrument] = event.target.value
        props.setAllSounds(soundsCopy)
    };

    function importAll(r) {
        let sounds = {};
        r.keys().map((item, _index) => {
            sounds[item] = r(item);
        });
        return sounds;
    }
      
    // require.context does not accept variables
    // so we have to initialize all possibilities separately
    const soundsSnare = importAll(
        require.context(
            '../../../assets/sounds/Snare',
            false,
            /\.(wav|mp3)$/
        )
    );

    const soundsCymbal = importAll(
        require.context(
            '../../../assets/sounds/Cymbal',
            false,
            /\.(wav|mp3)$/
        )
    );

    const soundsHat = importAll(
        require.context(
            '../../../assets/sounds/Hat',
            false,
            /\.(wav|mp3)$/
        )
    );

    const soundsKick = importAll(
        require.context(
            '../../../assets/sounds/Kick',
            false,
            /\.(wav|mp3)$/
        )
    );

    const sounds = {
        'Kick': soundsKick,
        'Hat': soundsHat,
        'Cymbal': soundsCymbal,
        'Snare': soundsSnare
    }

    function playSound(s, e) {
        if (e.target.value) {
            return
        }
        let audiofile = new Audio(sounds[props.instrument][s]);
        audiofile.play();
    }

    return (
        <div>
            <div
                className='drumHead'
                id={props.instrument}
                onClick={(e) => playSound(props.allSounds[props.instrument], e)}
            >
            </div>
                <FormControl style={{width: '50%'}}>
                    <InputLabel id="drum">{props.instrument}</InputLabel>
                    <Select
                        labelId="drum"
                        id="demo-simple-select-helper"
                        value={props.allSounds[props.instrument]}
                        label="Sound"
                        onChange={handleChange}
                    >
                        {Object.keys(sounds[props.instrument]).map((sound, i) =>
                            <MenuItem key={i} value={sound}>
                                {sound.replace('./', '').replace('.wav', '').replace(/([A-Z])/g, ' $1')}
                                {/* strip prefix, suffix, and split each word */}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
        </div>
    )
}

export default Drum;
