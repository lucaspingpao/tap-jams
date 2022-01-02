import React from 'react'
import '../../../styles/Piano.css';

function Piano() {
    const pianoKeys = {
        'C' : 'white',
        'C#' : 'black',
        'D' : 'white',
        'Eb' : 'black',
        'E' : 'white',
        'F' : 'white',
        'F#' : 'black',
        'G' : 'white',
        'Ab' : 'black',
        'A' : 'white',
        'Bb' : 'black',
        'B' : 'white',
        'C' : 'white'
    }

    return (
        <div className='keys'>
            {Object.keys(pianoKeys).map((pianoKey, i) =>
                <div
                    key={i}
                    className={pianoKeys[pianoKey]}
                >
                    {pianoKey}
                </div>
            )}
        </div>
    )
}

export default Piano
