#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Dec 13 18:41:47 2020

@author: lucaspao
"""

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Nov 27 18:21:37 2020

@author: Lucas Pao
"""

# Packages used
import random # Used for generating random numbers
import thinkdsp # Used for generating sine waves
from pydub import AudioSegment # Used for converting waves into sound
from pydub.playback import play # Used for playing sound in Python

# Standard Note Names and their Frequencies (Hz)
noteFreqs = {
    "C0" : 16.35, "Db0" : 17.32, "D0" : 18.35, "Eb0" : 19.45,
    "E0" : 20.60, "F0" : 21.83, "Gb0" : 23.12, "G0" : 24.50,
    "Ab0" : 25.96, "A0" : 27.50, "Bb0" : 29.14, "B0" : 30.87,
    "C1" : 32.70, "Db1" : 34.65, "D1" : 36.71, "Eb1" : 38.89,
    "E1" : 41.20, "F1" : 43.65, "Gb1" : 46.25, "G1" : 49.00,
    "Ab1" : 51.91, "A1" : 55.00, "Bb1" : 58.27, "B1" : 61.74,
    "C2" : 65.41, "Db2" : 69.30, "D2" : 73.42, "Eb2" : 77.78,
    "E2" : 82.41, "F2" : 87.31, "Gb2" : 92.50, "G2" : 98.00,
    "Ab2" : 103.83, "A2" : 110.00, "Bb2" : 116.54, "B2" : 123.47,
    "C3" : 130.81, "Db3" : 138.59, "D3" : 146.83, "Eb3" : 155.56,
    "E3" : 164.81, "F3" : 174.61, "Gb3" : 185.00, "G3" : 196.00,
    "Ab3" : 207.65, "A3" : 220.00, "Bb3" : 233.08, "B3" : 246.94,
    "C4" : 261.63, "Db4" : 277.18, "D4" : 293.66, "Eb4" : 311.13,
    "E4" : 329.63, "F4" : 349.23, "Gb4" : 369.99, "G4" : 392.00,
    "Ab4" : 415.30, "A4" : 440.00, "Bb4" : 466.16, "B4" : 493.88,
    "C5" : 523.25, "Db5" : 554.37, "D5" : 587.33, "Eb5" : 622.25,
    "E5" : 659.25, "F5" : 698.46, "Gb5" : 739.99, "G5" : 783.99,
    "Ab5" : 830.61, "A5" : 880.00, "Bb5" : 932.33, "B5" : 987.77,
    "C6" : 1046.50, "Db6" : 1108.73, "D6" : 1174.66, "Eb6" : 1244.51,
    "E6" : 1318.51, "F6" : 1396.91, "Gb6" : 1479.98, "G6" : 1567.98,
    "Ab6" : 1661.22, "A6" : 1760.00, "Bb6" : 1864.66, "B6" : 1975.53,
}

chords = {
    "CMajor" : ["C4", "E4", "G4"],
    "DbMajor" : ["Db4", "F4", "Ab4"],
    "DMajor" : ["D4", "Gb4", "A4"],
    "EbMajor" : ["Eb4", "G4", "Bb4"],
    "EMajor" : ["E4", "Ab4", "B4"],
    "FMajor" : ["F4", "A4", "C5"],
    "GbMajor" : ["Gb4", "Bb4", "Db5"],
    "GMajor" : ["G3", "B3", "D4"],
    "AbMajor" : ["Ab3", "C4", "Eb4"],
    "AMajor" : ["A3", "Db4", "E4"],
    "BbMajor" : ["Bb3", "D4", "F4"],
    "BMajor" : ["B3", "Eb3", "Gb4"],
    "CMinor" : ["C4", "Eb4", "G4"],
    "DbMinor" : ["Db4", "E4", "Ab4"],
    "DMinor" : ["D4", "F4", "A4"],
    "EbMinor" : ["Eb4", "Gb4", "Bb4"],
    "EMinor" : ["E4", "G4", "B4"],
    "FMinor" : ["F4", "Ab4", "C5"],
    "GbMinor" : ["Gb4", "A4", "Db5"],
    "GMinor" : ["G3", "Bb3", "D4"],
    "AbMinor" : ["Ab3", "B4", "Eb4"],
    "AMinor" : ["A3", "C4", "E4"],
    "BbMinor" : ["Bb3", "Db4", "F4"],
    "BMinor" : ["B3", "D3", "Gb4"]
}

randomCoeffs = []
for i in range(0, 8):
    randomCoeffs.append(random.uniform(-1,1))

fourierCoeffs = {
    "sine": [0, 1, 0, 0, 0, 0, 0, 0],
    "sawtooth": [0, 0.6366, 0, -0.2122, 0, 0.1273, 0, -0.0909],
    "trumpet": [0.1155, 0.3417, 0.1789, 0.1232, 0.0678, 0.0473, 0.0260, 0.0045, 0.0020],
    "random": randomCoeffs
}

def createNote(noteName="A4", type="sine", amp=0.5, beats=1.0, filter=None, cutoff=None, filename="defaultFileName"):
    
    # Initialize some values, let signal be empty first
    frequency = noteFreqs[noteName]
    duration = beats / 2
    signal = thinkdsp.SinSignal(freq=0)
    
    # Add harmonics to the signal according to their Fourier Synthesis Coefficients
    for i in range(0, 8):
        signal += thinkdsp.SinSignal(freq=frequency*i, amp=amp*fourierCoeffs[type][i], offset=0)
    
    # Convert signal into wave to .wav file to AudioSegment to be mixed and played by the program
    wave = signal.make_wave(duration=duration, start=0, framerate=44100)
    wave.write(filename=filename)
    audio = AudioSegment.from_wav(filename)
    
    # Add filters if necessary
    if filter == "lowPass":
        audio = audio.low_pass_filter(cutoff)
        print("Applying Low-Pass Filter")
    if filter == "highPass":
        audio = audio.high_pass_filter(cutoff)
        print("Applying High-Pass Filter")
    return audio
  
def createSpace(track, attack=100, release=100):
    for i in range(0, len(track) - 1):
        if track[i][0:2] == track[i + 1][0:2]:
            track[i] = track[i].fade_out(duration=release)
            track[i + 1] = track[i + 1].fade_in(duration=attack)


def createChord(notes=[]):
    chord = notes[0]
    for note in notes:
        if note != notes[0]:
            chord = chord[:len(chord)].overlay(note[:len(note)])
    return chord

def noteToChord(chordName="CMajor", type="sine", beats=1.0):
    notes = []
    noteNames = chords[chordName]
    for note in noteNames:
        notes.append(createNote(noteName=note, type=type, amp=0.25, beats=beats))
    return createChord(notes)

def mixTracks(trackMelody, trackHarm, typeMelody="sine", typeHarm="sine"):
    notesHarm = []
    notesMelody = []
    
    for note in trackMelody:
        notesMelody.append(createNote(noteName=note, type=typeMelody, amp=0.25, beats=1.0))
        
    for chord in trackHarm:
        notesHarm.append(noteToChord(chordName=chord, type=typeHarm, beats=1.0))
    
    createSpace(notesMelody, attack=50, release=50)
    song = AudioSegment.empty()
    for i in range(len(notesMelody)):
        note1 = notesMelody[i]
        note2 = notesHarm[i]
        song += note1[:len(note1)].overlay(note2[:len(note2)])
    return song

