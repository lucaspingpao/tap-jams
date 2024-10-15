import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@material-ui/core';
import '../../../styles/Submit.css';
import Song from '../../../assets/sounds/test_mix.wav';

function Submit(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [composer, setComposer] = useState('');
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:8000/post-jam", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, composer })
          });
          navigate('/explore');
        } catch (error) {
          console.log(error.message);
        }
      }

    return (
        <div>
            <div className='fillInfo'>
                <Typography variant='h5'>Congratulations on finishing your song!</Typography>
                <p>Fill out the information below to publish it to the world!</p>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setSubmitted(true)}
                    >
                        Hear Your Song Now!
                    </Button>
                </div>
            </div>

            <br/>

            {submitted ?
                <div className='fillInfo'>
                    <audio controls>
                            <source src={Song} type="audio/wav"/>
                        </audio>
                    <div className='textFields'>
                        
                        <div style={{margin: 10}}>
                            <TextField
                                id="songTitle"
                                label="Title of Song"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div style={{margin: 10}}>
                            <TextField
                                id="composer"
                                label="Composer"
                                value={composer}
                                onChange={(e) => setComposer(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Post song!
                    </Button>
                </div>
                : <div></div>
            }
        </div>
    );
}

export default Submit;