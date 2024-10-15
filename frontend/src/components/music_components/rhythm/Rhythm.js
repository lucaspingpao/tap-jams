import React, { useState } from 'react';
import Drum from './Drum';
import DrumGrid from './DrumGrid';
import '../../../styles/Rhythm.css';
import { Typography } from '@material-ui/core';

function Rhythm(props) {
    const [sounds, setSounds] = useState({
        'Hat': './ClosedHat.wav',
        'Snare': './Snare.wav',
        'Kick': './Kick.wav',
        'Cymbal': './Boom.wav'
    });

    return (
        <div className='rhythm'>
            <Typography variant='h5'>Click on the drums to hear the sounds!</Typography>
            <div className='drumRack'>
                <Drum instrument='Hat' allSounds={sounds}/>
                <Drum instrument='Snare' allSounds={sounds}/>
                <Drum instrument='Kick' allSounds={sounds}/>
                <Drum instrument='Cymbal' allSounds={sounds}/>
            </div>
            <br/>
            <Typography variant='h5'>Create your own drum pattern!</Typography>
            <DrumGrid />

        </div>
    );
}

export default Rhythm;