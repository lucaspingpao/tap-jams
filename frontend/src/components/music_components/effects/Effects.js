import React, { useState } from 'react';
import { Typography, Button, ButtonGroup } from '@material-ui/core';
import ContinuousSlider from '../../app_components/ContinuousSlider';
// import DiscreteSlider from '../../app_components/DiscreteSlider';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import '../../../styles/Effects.css'

function Effects(props) {
    const [feature, setFeature] = useState('')

    const displayFeature = () => {
        setFeature('Feature coming soon!')
    }

    return (
        <div className='effects'>
            <Typography variant='h5' className='title'>Play with your favorite effects to spice up your song!</Typography>
            <ContinuousSlider effect='Volume' leftEmoji='🔈' leftLabel='lowVolume' rightEmoji='🔊' rightLabel='highVolume'/>
            <ContinuousSlider effect='Tempo' leftEmoji='🐢' leftLabel='turtle' rightEmoji='🐇' rightLabel='rabbit'/>
            <ContinuousSlider effect='Frequency Filter' leftEmoji='📠' leftLabel='fax' rightEmoji='☎' rightLabel='telephone'/>
            <ContinuousSlider effect='Transpose Key' leftEmoji='🦁' leftLabel='lion' rightEmoji='🐿' rightLabel='chipmunk'/>
            <div>
                <div className='play'>
                    <PlayCircleFilledIcon color='secondary'/>
                    {'\u00A0'} Play your song! {'\u00A0'}
                    <PlayCircleFilledIcon color='secondary'/>
                </div>
                <ButtonGroup color="secondary" aria-label="outlined primary button group">
                    <Button onClick={displayFeature}>Original</Button>
                    <Button onClick={displayFeature}>New</Button>
                </ButtonGroup>
                <div className='feature'>{feature}</div>
            </div>
        </div>
    );
}

export default Effects;