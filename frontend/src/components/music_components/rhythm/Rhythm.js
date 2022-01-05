import React, { useState } from 'react';
import Drum from './Drum';
import DrumGrid from './DrumGrid';
import '../../../styles/Rhythm.css';
import { Button, ButtonGroup, MenuItem, Select, Typography } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SaveIcon from '@material-ui/icons/Save';

function Rhythm(props) {
    const [filled, setFilled] = useState({
        'Hat': '1111111111111111',
        'Snare': '0010001000100010',
        'Kick': '1000100010001000',
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
            'Kick': '1000100010001000',
            'Cymbal': '1000000000000000'
        },
        'Jazz': {
            'Hat': '1111111111111111',
            'Snare': '0010001000100010',
            'Kick': '1000001010000010',
            'Cymbal': '1000000000000000'
        }
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
                    onClick = {async () => {
                        const response = await fetch('/rhythm', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({sounds, filled})
                        })
                    }}
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