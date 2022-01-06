import React from 'react'
import '../../../styles/Piano.css';
import { Radio, RadioGroup, FormControlLabel, FormControl, InputLabel, Select, Button, Typography, ButtonGroup } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SaveIcon from '@material-ui/icons/Save';
import Song from '../../../assets/sounds/test_piano.wav';

function Piano(props) {
    const [keyType, setKeyType] = React.useState('Major');
    const [chords, setChords] = React.useState(['GMajor', 'EMinor', 'CMajor', 'DMajor'])
    const [currentlyPlaying, setCurrentlyPlaying] = React.useState();

    const handleChordChange = (i, e) => {
        let chordsCopy = [...chords];
        chordsCopy[i] = e.target.value;
        setChords(chordsCopy);
    }

    const pianoKeys = {
        'C' : 'white',
        'Db' : 'black',
        'D' : 'white',
        'Eb' : 'black',
        'E' : 'white',
        'F' : 'white',
        'Gb' : 'black',
        'G' : 'white',
        'Ab' : 'black',
        'A' : 'white',
        'Bb' : 'black',
        'B' : 'white'
    }

    const majorChords = Object.keys(pianoKeys).map((pianoKey) => (pianoKey.concat('Major')));
    const minorChords = Object.keys(pianoKeys).map((pianoKey) => (pianoKey.concat('Minor')));

    function importAll(r) {
        let sounds = {};
        r.keys().map((item, _index) => {
            sounds[item] = r(item);
            return;
        });
        return sounds;
    }
      
    // require.context does not accept variables
    // so we have to initialize all possibilities separately
    const soundsPiano = importAll(
        require.context(
            '../../../assets/sounds/Piano Chords',
            false,
            /\.(wav|mp3)$/
        )
    );

    function playSound(keyName) {
        if (currentlyPlaying) {
            currentlyPlaying.pause();
            currentlyPlaying.currentTime = 0;
        }
        let flatKeyName = keyName.replace('C#', 'Db').replace('F#', 'Gb');
        const filename = './'.concat(flatKeyName).concat(keyType).concat('.wav');
        let audiofile = new Audio(soundsPiano[filename]);
        setCurrentlyPlaying(audiofile);
        audiofile.play();
    }

    // calls Flask API (doesn't work yet)
    // const playChords = async () => {
    //     const response = await fetch('/harmony', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(chords)
    //     })
    // }

    // plays wav file directly saved to assets
    const playChordsManually = () => {
        let audiofile = new Audio(Song);
        audiofile.play();
    }


    return (
        <div className='piano'>
            <Typography variant='h5'>Click the piano keys to hear the sounds!</Typography>
            <div className='chords'>
                <div className='keys'>
                    {Object.keys(pianoKeys).map((pianoKey, i) =>
                        <div
                            key = {i}
                            className = {pianoKeys[pianoKey].concat(' ').concat(pianoKey)}
                            onClick = {() => playSound(pianoKey)}
                        >
                            {pianoKey.replace('Db', 'C#').replace('Gb', 'F#')}
                        </div>
                    )}
                </div>
                <RadioGroup aria-label="keyType" name="keyType" value={keyType} onChange={(e) => setKeyType(e.target.value)}>
                    <FormControlLabel value="Major" control={<Radio />} label="Major" />
                    <FormControlLabel value="Minor" control={<Radio />} label="Minor" />
                </RadioGroup>
            </div>
            
            <div className='chordProgression'>
                <Typography variant='h5'>Create your own chord progression!</Typography>

                {/* Create 4 copies of select buttons */}
                <div className='chords'>
                    {[...Array(4).keys()].map((index) => (
                        <FormControl variant="outlined" key={index}>
                            <InputLabel htmlFor={"chord".concat(index.toString())}>Chord {index+1}</InputLabel>
                            <Select
                                native
                                value={chords[index]}
                                onChange={(e) => handleChordChange(index, e)}
                                label="Chord"
                                inputProps={{
                                    name: 'chord',
                                    id: "chord".concat(index.toString()),
                                }}
                            >
                            {majorChords.concat(minorChords).map((musicKey, j) => (
                                <option key={j} value={musicKey}>{musicKey}</option>
                            ))}
                            </Select>
                        </FormControl>
                    ))}
                    <div className = 'playChords'>
                        <ButtonGroup orientation='vertical' color="secondary" aria-label="outlined primary button group">
                            <Button
                                onClick={playChordsManually}
                            >
                                Play Chords {'\u00A0'}
                                <PlayCircleFilledIcon color="secondary"/>
                            </Button>
                            <Button>
                                Save Chords {'\u00A0'}
                                <SaveIcon color="secondary"/>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div className='feature'>Feature coming soon: use predictive algorithms to choose the best chords for your song!</div>
            </div>
        </div>
    )
}

export default Piano;