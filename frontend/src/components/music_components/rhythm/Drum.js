import React from 'react'
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import '../../../styles/Rhythm.css';

function Drum(props) {
    const [sound, setSound] = React.useState('');

    const handleChange = (event) => {
        setSound(event.target.value);
    };

    return (
        <div className='drumHead'>
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.instrument}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sound}
                    label="Sound"
                    onChange={handleChange}
                >
                    {props.sounds.map((sound, i) =>
                        <MenuItem
                            key={i}
                            value={sound}
                        >
                            {sound}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            </Box>
        </div>
    )
}

export default Drum;