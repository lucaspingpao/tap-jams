import React, { useState } from 'react';
import Drum from './Drum';
import DrumGrid from './DrumGrid';
import '../../../styles/Rhythm.css';
import { Button, ButtonGroup, MenuItem, Select, Typography } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SaveIcon from '@material-ui/icons/Save';
import Song from '../../../assets/sounds/test_drums.wav';

function Rhythm(props) {
    const [filled, setFilled] = useState({
        'Hat': '1111111111111111',
        'Snare': '0010001000100010',
        'Kick': '1000010010000100',
        'Cymbal': '1000000000000000'
    });

    const [sounds, setSounds] = useState({
        'Hat': './ClosedHat.wav',
        'Snare': './Snare.wav',
        'Kick': './Kick.wav',
        'Cymbal': './Boom.wav'
    });

    const [genre, setGenre] = useState('Rock')

    const genres = {
        'Rock': {
            'Hat': '1111111111111111',
            'Snare': '0010001000100010',
            'Kick': '1000010010000100',
            'Cymbal': '1000000000000000'
        },
        'Jazz': {
            'Hat': '1011101110111011',
            'Snare': '0010001000100010',
            'Kick': '0010001000100010',
            'Cymbal': '1000000000000000'
        },
        'Hip-Hop': {
            'Hat': '1111111111111111',
            'Snare': '0000100000001000',
            'Kick': '1001000101010001',
            'Cymbal': '1000000000000000'
        },
        'Latin': {
            'Hat': '1111111111111111',
            'Snare': '0001001000010010',
            'Kick': '1000100010001000',
            'Cymbal': '1000000000000000'
        }
    }

    // calls Flask API (doesn't work yet)
    const playDrums = async () => {
        const response = await fetch('/rhythm', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({sounds, filled})
        })
    }

    // plays wav file directly saved to assets
    const playDrumsManually = () => {
        let audiofile = new Audio(Song);
        audiofile.play();
    }

    return (
        <div className='rhythm'>
            <Typography variant='h5'>Click on the drums to hear the sounds!</Typography>
            <div className='drumRack'>
                <Drum instrument='Hat' allSounds={sounds} setAllSounds={setSounds}/>
                <Drum instrument='Snare' allSounds={sounds} setAllSounds={setSounds}/>
                <Drum instrument='Kick' allSounds={sounds} setAllSounds={setSounds}/>
                <Drum instrument='Cymbal' allSounds={sounds} setAllSounds={setSounds}/>
            </div>

            <br/><br/>

            <Typography variant='h5'>Create your own drum pattern!</Typography>
            <div className='localPlay'>
                <Select
                    className="select"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                {Object.keys(genres).map((genre, i) =>
                    <MenuItem
                        key={i}
                        value={genre}
                    >
                        {genre}
                    </MenuItem>
                )}
                </Select>
                <Button onClick={(e) => (setFilled(genres[genre]))}>Set Style!</Button>
            </div>

            <div>
                <DrumGrid filledSquares={filled} setFilled={setFilled}/>
            </div>

            <ButtonGroup color="secondary" aria-label="outlined primary button group">
                <Button
                    onClick={playDrumsManually}
                >
                    Play Drum Pattern! {'\u00A0'}
                    <PlayCircleFilledIcon color="secondary"/>
                </Button>
                <Button
                
                >
                    Save Drum Pattern! {'\u00A0'}
                    <SaveIcon color="secondary"/>
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default Rhythm;