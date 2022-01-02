import React from 'react';
import Drum from './Drum';
import DrumGrid from './DrumGrid';
import '../../../styles/Rhythm.css';

function Rhythm(props) {
    return (
        <div>
            <h3>Click on the drums to hear the sounds!</h3>
            <div className='drumRack'>
                <Drum instrument='Hi-Hats' sounds={['hat1', 'hat2', 'hat3']}/>
                <Drum instrument='Snare' sounds={['hat1', 'hat2', 'hat3']}/>
                <Drum instrument='Kick' sounds={['hat1', 'hat2', 'hat3']}/>
                <Drum instrument='Toms' sounds={['hat1', 'hat2', 'hat3']}/>
                <Drum instrument='Crash' sounds={['hat1', 'hat2', 'hat3']}/>
            </div>

            <br/>
            <h3>Create your own drum pattern!</h3>

            <DrumGrid
                filled = {{
                    'Hat': '0101010101010101',
                    'Snare': '0101010101010101',
                    'Kick': '0101010101010101',
                    'Tom': '0101010101010101',
                    'Crash': '0101010101010101'
                }}
            />
        </div>
    );
}

export default Rhythm;