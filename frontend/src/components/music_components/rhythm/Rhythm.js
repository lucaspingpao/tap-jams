import React, { useState } from 'react';
import Drum from './Drum';
import DrumGrid from './DrumGrid';
import '../../../styles/Rhythm.css';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function Rhythm(props) {
    const [filled, setFilled] = useState({
        'Hat': '1111111111111111',
        'Snare': '0010001000100010',
        'Kick': '1000100010001000',
        'Cymbal': '1000000000000000'
    });

    const [sounds, setSounds] = useState({
        'Hat': '',
        'Snare': '',
        'Kick': '',
        'Cymbal': ''
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
        <div>
            <h3>Click on the drums to hear the sounds!</h3>
            <div className='drumRack'>
                <Drum instrument='Hat' allSounds={sounds} setAllSounds={setSounds}/>
                <Drum instrument='Snare' allSounds={sounds} setAllSounds={setSounds}/>
                <Drum instrument='Kick' allSounds={sounds} setAllSounds={setSounds}/>
                <Drum instrument='Cymbal' allSounds={sounds} setAllSounds={setSounds}/>
            </div>

            <br/>
            <h3>Create your own drum pattern!</h3>

            <DrumGrid filledSquares={filled} setFilled={setFilled}/>

            <Button 
                onClick = {async () => {
                    const response = await fetch('/rhythm', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({sounds, filled})
                    })
                }}
            >
                Play Drum Pattern!
            </Button>

            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Style</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={genre}
                    label="Style"
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
            </FormControl>
            </Box>
        </div>
    );
}

export default Rhythm;