import React, { useState } from 'react'
import { ButtonGroup, Button } from '@material-ui/core';
import Sidebar from './Sidebar';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import SaveIcon from '@material-ui/icons/Save';

import Song from '../../assets/sounds/test_mix.wav';

import '../../styles/GlobalControls.css';


function GlobalControls() {
    const playButton = async () => {
        setDisplaySave('');
        let audiofile = new Audio(Song);
        audiofile.play();
        // const response = await fetch('/play', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify('')
        // })
    }

    const stopButton = () => {
        setDisplaySave('')
    }

    const saveButton = () => {
        setDisplaySave('Feature coming soon!')
    }

    const [displaySave, setDisplaySave] = useState(false);

    return (
        <div><Sidebar/>
        <div className='controlBar'>
            <div className='global'>Global Controls</div>
                <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                    className='buttonBar'
                >
                    <Button onClick = {playButton}>
                        <PlayCircleFilledIcon/>
                    </Button>
                    <Button onClick = {stopButton}>
                        <StopIcon/>
                    </Button>
                    <Button onClick = {saveButton}>
                        <SaveIcon/>
                    </Button>
                </ButtonGroup>
            <div className='feature'>{displaySave}</div>
        </div>
        </div>
    )
}

export default GlobalControls;
