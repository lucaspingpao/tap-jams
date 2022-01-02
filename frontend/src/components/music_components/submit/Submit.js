import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

function Submit(props) {
    const [title, setTitle] = useState('');
    const [composer, setComposer] = useState('');
    return (
        <div>
             <TextField
                id="standard-basic"
                label="Title of Song"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <TextField
                id="standard-basic"
                label="Composer"
                value={composer}
                onChange={(event) => setComposer(event.target.value)}
            />

            <Button variant="contained" color="primary">
                Submit!
            </Button>
        </div>
    );
}

export default Submit;