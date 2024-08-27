import React, { useState } from 'react';
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import MicIcon from '@material-ui/icons/Mic';
import { ButtonGroup, Button } from '@material-ui/core';

function Melody(props) {
    // const playButton = async () => {
    //     setDisplaySave('');
    //     const response = await fetch('/play', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify('')
    //     })
    // }
    const stopButton = () => {
        setDisplaySave('')
    }

    const saveButton = () => {
        setDisplaySave('Feature coming soon!')
    }

    const [displaySave, setDisplaySave] = useState(false);
    return (
        <div>
            Record your own voice!
            <div className='melodyControlBar'>
                <div className='melodyTitle'></div>
                    <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                        className='buttonBar'
                    >
                        <Button onClick = {stopButton}>
                            <PlayCircleFilledIcon/>
                        </Button>
                        <Button onClick = {stopButton}>
                            <StopIcon/>
                        </Button>
                        <Button onClick = {saveButton}>
                            Record
                        </Button>
                        <Button onClick = {saveButton}>
                            <MicIcon/>
                        </Button>
                    </ButtonGroup>
                <div className='feature'>{displaySave}</div>
            </div>
        </div>
    );
}

export default Melody;