import React from 'react'
import '../../../styles/Piano.css';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, InputLabel, Select, Button } from '@material-ui/core';


function Piano(props) {
    const [keyType, setKeyType] = React.useState('Major');
    const [chords, setChords] = React.useState(['GMajor', 'EMinor', 'CMajor', 'DMajor'])

    const handleChordChange = (i, e) => {
        let chordsCopy = [...chords];
        chordsCopy[i] = e.target.value;
        setChords(chordsCopy);
    }

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

    const majorChords = Object.keys(pianoKeys).map((pianoKey) => (pianoKey.concat('Major')));
    const minorChords = Object.keys(pianoKeys).map((pianoKey) => (pianoKey.concat('Minor')));

    function importAll(r) {
        let sounds = {};
        r.keys().map((item, _index) => {
            sounds[item] = r(item);
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
        let flatKeyName = keyName.replace('C#', 'Db').replace('F#', 'Gb');
        const filename = './'.concat(flatKeyName).concat(keyType).concat('.wav');
        let audiofile = new Audio(soundsPiano[filename]);
        audiofile.play();
    }

    return (
        <div>
            <div className='keys'>
                {Object.keys(pianoKeys).map((pianoKey, i) =>
                    <div
                        key = {i}
                        className = {pianoKeys[pianoKey]}
                        onClick = {() => playSound(pianoKey)}
                    >
                        {pianoKey}
                    </div>
                )}
            </div>

<br/>

            <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup aria-label="keyType" name="keyType" value={keyType} onChange={(e) => setKeyType(e.target.value)}>
                <FormControlLabel value="Major" control={<Radio />} label="Major" />
                <FormControlLabel value="Minor" control={<Radio />} label="Minor" />
                </RadioGroup>
            </FormControl>

            {/* Create 4 copies of select buttons */}
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

            <Button 
                onClick = {async () => {
                    const response = await fetch('/harmony', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(chords)
                    })
                }}
            >
                Play Chords!
            </Button>
        </div>
    )
}

export default Piano;