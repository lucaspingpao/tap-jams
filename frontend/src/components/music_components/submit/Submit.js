import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import '../../../styles/Submit.css';
import Song from '../../../assets/sounds/test_mix.wav';

function Submit(props) {
    const [title, setTitle] = useState('');
    const [composer, setComposer] = useState('');
    const [submitted, setSubmitted] = useState(false)

    const submitButton = () => {
        if (title && composer) {
            setSubmitted(true);
        }
    }

    return (
        <div>
            {submitted ?
                <div className='fillInfo'>
                    <Typography variant='h5'>Congratulations, {composer}!</Typography>
                    <Typography variant='h5'>Listen to your latest hit, {title}!</Typography>

                    <br/>

                    <audio controls>
                        <source src={Song} type="audio/wav"/>
                    </audio>

                    <br/>

                    <Button
                        variant="contained"
                        color="primary"
                        href='/explore'
                    >
                        Explore!
                    </Button>
                </div>
            :
                <div className='fillInfo'>
                    <Typography variant='h5'>Congratulations on finishing your song!</Typography>
                    <p>Fill out the information below to publish it to the world!</p>

                    <div className='textFields'>
                        <div style={{margin: 10}}>
                            <TextField
                                id="songTitle"
                                label="Title of Song"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div style={{margin: 10}}>
                            <TextField
                                id="composer"
                                label="Composer"
                                value={composer}
                                onChange={(event) => setComposer(event.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitButton}
                    >
                        Submit!
                    </Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Submit;