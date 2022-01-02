import React from 'react'
import { ButtonGroup, Button } from '@material-ui/core';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import SaveIcon from '@material-ui/icons/Save';

import '../../styles/GlobalControls.css';


function GlobalControls() {
    return (
        <div className='controlBar'>
            <div>Global Controls</div>
            <div>
            <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
                className='buttonBar'
            >
                
                <Button><PlayCircleFilledIcon/></Button>
                <Button><StopIcon/></Button>
                <Button><SaveIcon/></Button>
            </ButtonGroup>
            </div>
        </div>
    )
}

export default GlobalControls;
