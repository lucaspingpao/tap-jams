import React from 'react';
import ContinuousSlider from '../../app_components/ContinuousSlider';

function Effects(props) {
    return (
        <div>
            <ContinuousSlider effect='Volume'/>
            <ContinuousSlider effect='Tempo'/>
            <ContinuousSlider effect='Frequency Filter'/>
            <ContinuousSlider effect='Transpose Key'/>
        </div>
    );
}

export default Effects;