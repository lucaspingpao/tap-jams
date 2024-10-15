import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/Pause';
import SaveIcon from '@material-ui/icons/Save';
import { MenuItem, Select, Typography } from '@material-ui/core';
import Grooves from './Grooves';
import * as Tone from 'tone';

function DrumGrid(props) {
    // State to manage loading status
    const [genre, setGenre] = useState('Rock');
    const [bpm, setBpm] = useState(80);
    const [isPlaying, setIsPlaying] = useState(false);

    const [patternEvents, setPatternEvents] = useState([
        { time: "0:0:0", name: "G2" },  // First eighth note
        { time: "0:0:1", name: "G2" },  // Second eighth note
        { time: "0:0:2", name: "G2" },  // Third eighth note
        { time: "0:0:3", name: "G2" },  // Fourth eighth note
        { time: "0:1:0", name: "G2" },  // Fifth eighth note
        { time: "0:1:1", name: "G2" },  // Sixth eighth note
        { time: "0:1:2", name: "G2" },  // Seventh eighth note
        { time: "0:1:3", name: "G2" },  // Eighth eighth note
        { time: "0:2:0", name: "G2" },  // First eighth note
        { time: "0:2:1", name: "G2" },  // Second eighth note
        { time: "0:2:2", name: "G2" },  // Third eighth note
        { time: "0:2:3", name: "G2" },  // Fourth eighth note
        { time: "0:3:0", name: "G2" },  // Fifth eighth note
        { time: "0:3:1", name: "G2" },  // Sixth eighth note
        { time: "0:3:2", name: "G2" },  // Seventh eighth note
        { time: "0:3:3", name: "G2" },  // Eighth eighth note

        { time: "0:0:0", name: "C2" },  // First eighth note
        { time: "0:1:1", name: "C2" },  // Sixth eighth note

        { time: "0:0:2", name: "Eb2" },  // Third eighth note
        { time: "0:1:2", name: "Eb2" },  // Seventh eighth note

        { time: "0:2:0", name: "C2" },  // First eighth note
        { time: "0:3:1", name: "C2" },  // Sixth eighth note

        { time: "0:2:2", name: "Eb2" },  // Third eighth note
        { time: "0:3:2", name: "Eb2" },  // Seventh eighth note

        { time: "0:0:0", name: "Bb2" },  // Seventh eighth note
    ]);
    const [pattern, setPattern] = useState(null);

    const [filledSquares, setFilledSquares] = useState({
        'Hat': '1111111111111111',
        'Snare': '0010001000100010',
        'Kick': '1000010010000100',
        'Cymbal': '1000000000000000'
    });

    // Create drum sounds using Tone.js instruments
    const drums = new Tone.Sampler({
        urls: { 
            'C2': 'Kick/Kick.wav',
            'Eb2': 'Snare/Snare.wav',
            'G2': 'Hat/ClosedHat.wav',
            'Bb2': 'Cymbal/Boom.wav'
        },
        baseUrl: `${process.env.PUBLIC_URL}/sounds/`,
    }).toDestination();

    // Load samples and set up scheduling
    useEffect(() => {
        const loadSamples = async () => {
            try {
                await Tone.loaded();
        
                // Create or update the pattern with new events
                const newPattern = new Tone.Part((time, note) => {
                drums.triggerAttackRelease(note.name, 0.1, time);
                }, patternEvents)
        
                setPattern(newPattern);
                newPattern.loop = true;
                newPattern.start(0);
                
            } catch (err) {
                console.error("Error loading samples or starting Tone.js:", err);
            }
        };
    
        loadSamples();
    
        // Cleanup function
        return () => {
            if (pattern) {
                pattern.dispose(); // Clean up the previous pattern
            }
            Tone.Transport.cancel(); // Remove all scheduled events
        };
    }, [patternEvents]);

    const startDrumPattern = async () => {
        if (!isPlaying) {
            try {
                await Tone.start(); // Start the audio context
                Tone.Transport.bpm.value = bpm;

                const playPattern = new Tone.Part((time, note) => {
                    drums.triggerAttackRelease(note.name, 0.1, time);
                }, [pattern]);
        
                // Start the part
                playPattern.start(0);
                playPattern.loop = true;
                playPattern.loopStart = 0;
                playPattern.loopEnd = '8m';

                Tone.Transport.start();
                setIsPlaying(true);
            } catch (err) {
                console.error("Error starting Tone.js:", err);
            }
        }
    };

    const stopDrumPattern = () => {
        if (isPlaying) {
            Tone.Transport.stop();
            setIsPlaying(false);
        }
    };

    const updateBpm = (e) => {
        const newBpm = e.target.value;
        setBpm(newBpm);
        if (isPlaying) {
            Tone.Transport.bpm.value = newBpm; // Update BPM if playing
        }
    };

    const colorSquares = (e) => {
        const [instrument, beat] = e.target.id.split(',');
        let filledCopy = {...filledSquares};
        let currentBeats = filledSquares[instrument].split(''); // deconstruct beats into array
        currentBeats[beat] = (Number(currentBeats[beat]) ^ 1).toString(); // flip appropriate bit
        filledCopy[instrument] = currentBeats.join('') // collapse new array
        setFilledSquares(filledCopy);
    };

    const handleChange = (e) => {
        const newGenre = e.target.value
        setGenre(newGenre);
        setFilledSquares(Grooves[newGenre]);
    };

    const updatePattern = () => {
        if (pattern) {
            // Stop and dispose of the previous pattern to clean up resources
            pattern.stop();
            pattern.dispose();
        }

        console.log(patternEvents)
    
        // Create a new pattern with updated events
        const updatedPattern = new Tone.Part((time, note) => {
            drums.triggerAttackRelease(note.name, 0.1, time);
        }, patternEvents);
    
        // Set looping properties
        updatedPattern.loop = true;
        updatedPattern.loopEnd = '8m'; // Adjust loop length as needed
    
        // Start the updated pattern at the beginning
        updatedPattern.start(0);
    
        // Update the state with the new pattern
        setPattern(updatedPattern);
    };

    const convertPattern = (str, noteName) => {
        let newPattern = str.split('').map((c, i) => {
            if (c === '1') {
                return { time: "0:" + (Math.floor(i / 4)).toString() + ":" + (i % 4).toString(), name: noteName }
                if (i == 0) {
                    return { time: 0, name: noteName }
                } else {
                    return { time: (i * 2).toString() + "n", name: noteName }
                }
            }
            else {
                return
            }
        });
        newPattern = newPattern.filter((p) => (p !== undefined));
        return newPattern
    }

    const handleUpdatePattern = () => {
        setPatternEvents([
            ...convertPattern(filledSquares['Hat'], 'G2'),
            ...convertPattern(filledSquares['Snare'], 'Eb2'),
            ...convertPattern(filledSquares['Kick'], 'C2'),
            ...convertPattern(filledSquares['Cymbal'], 'Bb2')
        ]);
        
        updatePattern();
    };

    return (
        <div>
            <Typography variant='body1'>Choose a preset groove:&nbsp;</Typography>
            <div className='localPlay'>
                <Select
                    className="select"
                    value={genre}
                    onChange={handleChange}
                >
                {Object.keys(Grooves).map((g, i) =>
                    <MenuItem key={i} value={g}>{g}</MenuItem>
                )}
                </Select>
            </div>
            <div className='drumGrid'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {[...Array(16).keys()].map((index) =>
                                <th key={index}>{index+1}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(filledSquares).map(([instrument, str], i) => {
                            return (
                                <tr key={i}>
                                    <td>{instrument}</td>
                                    {str.split('').map((val, j) =>
                                        <td
                                            onClick={colorSquares}
                                            id={instrument.concat(',').concat(j.toString())}
                                            className={val==='1' ? 'filled': 'empty'}
                                        >
                                        </td>
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <ButtonGroup color="secondary" aria-label="outlined primary button group">
                <Button onClick={startDrumPattern}>
                    Play {'\u00A0'}
                    <PlayCircleFilledIcon color="secondary"/>
                </Button>
                <Button onClick={stopDrumPattern}>
                    Pause {'\u00A0'}
                    <PauseIcon color="secondary"/>
                </Button>
                <Button onClick={handleUpdatePattern}>
                    Save {'\u00A0'}
                    <SaveIcon color="secondary"/>
                </Button>
            </ButtonGroup>
            <div>
                <label>
                    BPM:
                    <input 
                    type="range" 
                    value={bpm} 
                    onChange={updateBpm} 
                    min="40" 
                    max="208" 
                    />
                </label>
            </div>
        </div>
    )
}

export default DrumGrid;