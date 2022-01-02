#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Nov 27 18:21:37 2020

@author: Lucas Pao
"""

# *** NOTE ***
# To hear the results of this program, uncomment the lines that use the function "play"

# Functionalities of Lucas Pao's Python Synthesizer
# 1. Oscillator: can generate sine wave signals and synthesizes other sounds
#    through combining harmonics with Fourier Series Coefficients
# 2. Filters: can add low-pass and high-pass filters at specified cutoff frequencies
# 3. Distortion: can synthesize distorted sounds by joining clipped sounds at high amplitudes
# 4. Polyphony: can combine audio signals linearly to output polyphonic sounds
# 5. Envelope: can add Attack and Release times to notes (from the ADSR envelope)
# 6. Looping: can loop song sections or sequences of sounds through for loops
# 7. Instrument: can play cool songs :)

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
    "Ab4" : 415.30, "A4" : 440.00, "Bb4" : 446.16, "B4" : 493.88,
    "C5" : 523.25, "Db5" : 554.37, "D5" : 587.33, "Eb5" : 622.25,
    "E5" : 659.25, "F5" : 698.46, "Gb5" : 739.99, "G5" : 783.99,
    "Ab5" : 830.61, "A5" : 880.00, "Bb5" : 932.33, "B5" : 987.77,
}

# Generates a random set of coefficients to be used for Fourier Sound Synthesis
randomCoeffs = []
for i in range(0, 8):
    randomCoeffs.append(random.uniform(-1,1))

# I will synthesize sounds by combining overtone harmonics of a sine wave
# The index n of a list represents the nth harmonic
# The coefficients represent the amplitude of the corresponding harmonic
fourierCoeffs = {
    "sine": [0, 1, 0, 0, 0, 0, 0, 0],
    "sawtooth": [0, 0.6366, 0, -0.2122, 0, 0.1273, 0, -0.0909],
    "trumpet": [0.1155, 0.3417, 0.1789, 0.1232, 0.0678, 0.0473, 0.0260, 0.0045, 0.0020],
    "random": randomCoeffs
}

# Sound Synthesis
# Function that creates an AudioSegment of a certain note
# Amp is relative amplitude (higher amplitudes may cause clipping and can be used to create distortion effects)
# Beats is length of note relative to a quarter note at 120BPM
# Filter can be low-pass or high-pass depending on the cutoff frequency given
# Filename doesn't really matter in this composition because I will be reading in the sound signal back into Python later
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
    print("Creating note " + noteName + " at " + str(frequency) + " for " + str(beats) + " beats with the " + type + " synthesizer!")
    
    # Add filters if necessary
    if filter == "lowPass":
        audio = audio.low_pass_filter(cutoff)
        print("Applying Low-Pass Filter")
    if filter == "highPass":
        audio = audio.high_pass_filter(cutoff)
        print("Applying High-Pass Filter")
    return audio
    
# Example of hardcoded process for A4 (440Hz)
    # A4signal = thinkdsp.SinSignal(freq=440, amp=1.0, offset=0)
    # A4wave = A4signal.make_wave(duration=1, start=0, framerate=44100)
    # A4wave.write(filename='/Users/lucaspao/Documents/Projects/Python/A4wave.wav')
    # A4audio = AudioSegment.from_wav("/Users/lucaspao/Documents/Projects/Python/A4wave.wav")
    
# Example notes
A4 = createNote(noteName="A4", type="sine", amp=1.0, beats=4.0, filter=None, cutoff=None, filename="A4demo.mp3")
A4_trumpet = createNote(noteName="A4", type="trumpet", amp=1.0, beats=4.0, filter=None, cutoff=None)
A4_distorted = A4_trumpet[:len(A4_trumpet)].overlay(A4_trumpet[:len(A4_trumpet)])
A4_highPass = createNote(noteName="A4", type="trumpet", amp=1.0, beats=4.0, filter="highPass", cutoff=5000)

# play(A4)
# play(A4_trumpet)
# play(A4_distorted)
# play(A4_highPass)
C4 = createNote("C4")
D4 = createNote("D4")
E4 = createNote("E4")
C4.export("C4.mp3")
D4.export("D4.mp3")
E4.export("E4.mp3")
otherNotes = A4_trumpet + A4_distorted + A4_highPass
# play(otherNotes)
# otherNotes.export("otherNotes.mp3")

# Envelopes
# .fade_in and .fade_out serve as crossfaders for DJs in combining multiple audio signals
# But in this case, I convert each note into its own signal
# So .fade_in serves as the "Attack" time on the ADSR envelope
# And .fade_out serves as the "Release" time on the ADSR envelope
# Creates spacing between consecutive notes that are the same by adding attack and release
def createSpace(track, attack=100, release=100):
    for i in range(0, len(track) - 1):
        if track[i][0:2] == track[i + 1][0:2]:
            track[i] = track[i].fade_out(duration=release)
            track[i + 1] = track[i + 1].fade_in(duration=attack)

# Combines two audio tracks
def mix2tracks(track1, track2):
    createSpace(track1, attack=50, release=50)
    createSpace(track2, attack=50, release=50)
    song = AudioSegment.empty()
    for i in range(len(track1)):
        note1 = track1[i]
        note2 = track2[i]
        song += note1[:len(note1)].overlay(note2[:len(note2)])
    return song

# Create notes for 1st song with the standard Sinewave synthesizer
# Default: quarter note, Long: half note

G3_long= createNote("G3", "sine", beats=2.0)
C4 = createNote("C4", "sine")
D4 = createNote("D4", "sine"); D4_long= createNote("D4", "sine", beats=2.0)
Eb4 = createNote("Eb4", "sine")
E4 = createNote("E4", "sine")
F4_long= createNote("F4", "sine", beats=2.0)
Gb4 = createNote("Gb4", "sine"); Gb4_long = createNote("Gb4", "sine", beats=2.0)
G4 = createNote("G4", "sine"); G4_long= createNote("G4", "sine", beats=2.0)
Ab4 = createNote("Ab4", "sine"); 
A4 = createNote("A4", "sine"); A4_long= createNote("A4", "sine", beats=2.0)
B4 = createNote("B4", "sine"); B4_long= createNote("B4", "sine", beats=2.0)
C5 = createNote("C5", "sine")
D5 = createNote("D5", "sine"); D5_long= createNote("D5", "sine", beats=2.0)
G5_long= createNote("G5", "sine", beats=2.0)

# Song 1: Jingle Bells
track1 = [B4, B4, B4_long, B4, B4, B4_long, B4, D5, G4, A4, B4_long, B4_long,
          C5, C5, C5, C5, C5, B4, B4, B4, B4, A4, A4, B4, A4_long, D5_long,
          B4, B4, B4_long, B4, B4, B4_long, B4, D5, G4, A4, B4_long, B4_long,
          C5, C5, C5, C5, C5, B4, B4, B4, D5, D5, C5, A4, G4_long, G5_long]
track2 = [G4, B4, D4_long, G4, B4, D4_long, G4, B4, D4, Gb4, G4_long, F4_long,
          E4, G4, Eb4, G4, D4, G4, E4, Ab4, A4, E4, C4, E4, D4_long, Gb4_long,
          G4, B4, D4_long, G4, B4, D4_long, G4, B4, D4, Gb4, G4_long, F4_long,
          E4, G4, Eb4, G4, D4, G4, E4, Ab4, A4, E4, D4, Gb4, G4_long, G3_long]
song1 = mix2tracks(track1=track1, track2=track2)

print("\n *** NOW PLAYING *** \n Jingle Bells on the SineWave Synthesizer!")
# play(song1)

# Create notes for 2nd song with the Sawtooth synthesizer
# Default: quarter note, Short: eighth note, Dot: dotted quarter, Long: half note
G3_long= createNote("G3", "sawtooth", beats=2.0)
B3 = createNote("B3", "sawtooth")
D4 = createNote("D4", "sawtooth"); D4_short = createNote("D4", "sawtooth", beats=0.5)
Gb4 = createNote("Gb4", "sawtooth"); Gb4_short = createNote("Gb4", "sawtooth", beats=0.5); Gb4_dot = createNote("Gb4", "sawtooth", beats=1.5);
G4 = createNote("G4", "sawtooth"); G4_short = createNote("G4", "sawtooth", beats=0.5); G4_dot = createNote("G4", "sawtooth", beats=1.5); G4_long= createNote("G4", "sawtooth", beats=2.0)
A4 = createNote("A4", "sawtooth"); A4_short = createNote("A4", "sawtooth", beats=0.5); A4_dot = createNote("A4", "sawtooth", beats=1.5)
B4 = createNote("B4", "sawtooth"); B4_short = createNote("B4", "sawtooth", beats=0.5); B4_dot = createNote("B4", "sawtooth", beats=1.5)
C5 = createNote("C5", "sawtooth"); C5_short = createNote("C5", "sawtooth", beats=0.5)
Db5_short = createNote("Db5", "sawtooth", beats=0.5)
D5 = createNote("D5", "sawtooth"); D5_short = createNote("D5", "sawtooth", beats=0.5); D5_dot = createNote("D5", "sawtooth", beats=1.5); D5_long = createNote("D5", "sawtooth", beats=2.0)
E5 = createNote("E5", "sawtooth"); E5_short = createNote("E5", "sawtooth", beats=0.5)
Gb5 = createNote("Gb5", "sawtooth"); Gb5_short = createNote("Gb5", "sawtooth", beats=0.5)
G5 = createNote("G5", "sawtooth")

# Song 2: Deck the Halls!
track1 = [D5_dot, C5_short, B4, A4, G4, A4, B4, G4, A4_short, B4_short, C5_short, A4_short, B4_dot, A4_short, G4, Gb4, G4_long,
          D5_dot, C5_short, B4, A4, G4, A4, B4, G4, A4_short, B4_short, C5_short, A4_short, B4_dot, A4_short, G4, Gb4, G4_long,
          A4_dot, B4_short, C5, A4, B4_dot, C5_short, D5, A4, B4_short, Db5_short, D5, E5_short, Gb5_short, G5, Gb5, E5, D5_long,
          D5_dot, C5_short, B4, A4, G4, A4, B4, G4, E5_short, E5_short, E5_short, E5_short, D5_dot, C5_short, B4, A4, G4_long]
track2 = [B4_dot, A4_short, G4, D4, B3, D4, G4, D4, Gb4_short, G4_short, A4_short, Gb4_short, G4_dot, D4_short, B3, D4, G3_long,
          B4_dot, A4_short, G4, D4, B3, D4, G4, D4, Gb4_short, G4_short, A4_short, Gb4_short, G4_dot, D4_short, B3, D4, G3_long,
          Gb4_dot, G4_short, A4, Gb4, G4_dot, A4_short, B4, Gb4, G4_short, A4_short, B4, Db5_short, D5_short, E5, D5, A4, D4_long,
          B4_dot, A4_short, G4, D4, B3, D4, G4, D4, C5_short, C5_short, C5_short, C5_short, B4_dot, A4_short, G4, D4, G3_long]
song2 = mix2tracks(track1=track1, track2=track2)

print("\n *** NOW PLAYING *** \n Deck the Halls on the Sawtooth Synthesizer!")
# play(song2)

# Create notes for 3nd song with the Trumpet syntheiszer
# Default: quarter note, Short: eighth note, Short: eighth note, Long: half note
G3 = createNote("G3", "trumpet"); G3_short = createNote("G3", "trumpet", beats=0.5)
A3_short = createNote("A3", "trumpet", beats=0.5)
B3 = createNote("B3", "trumpet"); B3_short = createNote("B3", "trumpet", beats=0.5); B3_long = createNote("B3", "trumpet", beats=3.0)
C4 = createNote("C4", "trumpet"); C4_short = createNote("C4", "trumpet", beats=0.5)
D4 = createNote("D4", "trumpet"); D4_short = createNote("D4", "trumpet", beats=0.5)
E4 = createNote("E4", "trumpet"); E4_short = createNote("E4", "trumpet", beats=0.5)
Gb4_short = createNote("Gb4", "trumpet", beats=0.5)
G4 = createNote("G4", "trumpet"); G4_short = createNote("G4", "trumpet", beats=0.5); G4_long = createNote("G4", "trumpet", beats=3.0)
A4 = createNote("A4", "trumpet"); A4_short = createNote("A4", "trumpet", beats=0.5)
B4 = createNote("B4", "trumpet"); B4_short = createNote("B4", "trumpet", beats=0.5)
C5 = createNote("C5", "trumpet"); C5_short = createNote("C5", "trumpet", beats=0.5)
D5 = createNote("D5", "trumpet"); D5_short = createNote("D5", "trumpet", beats=0.5)
E5_short = createNote("E5", "trumpet", beats=0.5)

# Song 3: 12 (4) Days of Christmas!
intro1 = [D4_short, D4_short, D4, G4_short, G4_short, G4, Gb4_short, G4_short, A4_short, B4_short, C5_short, A4_short, B4, B4_short, C5_short]
sequence1 = [D5, A4_short, B4_short, C5]
pickup1 = [B4_short, C5_short]
ending1 = [D5, E5_short, C5_short, B4_short, G4_short, A4, G4_long.fade_out(duration=1000)]
intro2 = [B3_short, A3_short, G3, G3_short, A3_short, B3, A3_short, B3_short, C4_short, D4_short, E4_short, Gb4_short, G4, G3_short, A3_short]
sequence2 = [D4, A3_short, B3_short, C4]
pickup2 = [G3_short, A3_short]
ending2 = [B3, C4_short, A3_short, D4_short, B3_short, C4, B3_long.fade_out(duration=1000)]

# For loop to add the repeating sequence in the middle of every iteration!
track1 = intro1 + ending1
track2 = intro2 + ending2
for i in range(1, 5):
    track1 += intro1 + i * sequence1 + pickup1 + ending1 
    track2  += intro2 + i * sequence2 + pickup2 + ending2
song3 = mix2tracks(track1=track1, track2=track2)

print("\n *** NOW PLAYING *** \n 12 (4) Days of Christmas on the Trumpet Synthesizer!")
# play(song3)

# Create notes for 4th song with the "Random" synthesizer
# Default: quarter note, Short: eighth note, Long: half note
D3 = createNote("D3", "random"); D3_short = createNote("D3", "random", beats=0.5)
E3 = createNote("E3", "random"); E3_short = createNote("E3", "random", beats=0.5)
Gb3 = createNote("Gb3", "random"); Gb3_short = createNote("Gb3", "random", beats=0.5)
G3 = createNote("G3", "random"); G3_short = createNote("G3", "random", beats=0.5); G3_long= createNote("G3", "random", beats=2.0)
A3 = createNote("A3", "random"); A3_short = createNote("A3", "random", beats=0.5)
B3 = createNote("B3", "random"); B3_short = createNote("B3", "random", beats=0.5)
C4 = createNote("C4", "random"); C4_short = createNote("C4", "random", beats=0.5)
Db4 = createNote("Db4", "random"); Db4_short = createNote("Db4", "random", beats=0.5)
D4 = createNote("D4", "random"); D4_short = createNote("D4", "random", beats=0.5)
Eb4 = createNote("Eb4", "random"); Eb4_short = createNote("Eb4", "random", beats=0.5)
E4 = createNote("E4", "random"); E4_short = createNote("E4", "random", beats=0.5)
Gb4 = createNote("Gb4", "random"); Gb4_short = createNote("Gb4", "random", beats=0.5)
G4 = createNote("G4", "random"); G4_short = createNote("G4", "random", beats=0.5); G4_long= createNote("G4", "random", beats=2.0)
A4 = createNote("A4", "random"); A4_short = createNote("A4", "random", beats=0.5)
B4 = createNote("B4", "random"); B4_short = createNote("B4", "random", beats=0.5)
C5 = createNote("C5", "random"); C5_short = createNote("C5", "random", beats=0.5)

# Song 4: We Wish You a Merry Christmas!
# With random Fourier Coefficients, the signal may sound distorted if this combination causes the amplitude to exceed 1
track1 = [D4, G4, G4_short, A4_short, G4_short, Gb4_short, E4, E4,
          E4, A4, A4_short, B4_short, A4_short, G4_short, Gb4, D4,
          D4, B4, B4_short, C5_short, B4_short, A4_short, G4, E4,
          D4_short, D4_short, E4, A4, Gb4, G4_long]
track2 = [D4, G3, A3_short, A3_short, B3_short, B3_short, C4, C4,
          B3, A3, B3_short, B3_short, Db4_short, Db4_short, D4, D4,
          C4, B3, Db4_short, Db4_short, Eb4_short, Eb4_short, E4, E4,
          G4_short, G4_short, C4, A3, D4, G3_long]
song4 = mix2tracks(track1=track1, track2=track2)

# Prints out random Fourier Coefficients in case the user is curious
print("Here are the random Fourier Coefficients of this sound signal: ")
print(fourierCoeffs["random"])
print("\n *** NOW PLAYING *** \n We Wish You A Merry Christmas on the Random Synthesizer!")
# play(song4)

# I did not want to synthesize each of the same sounds with filters, so here I applied the filter to the entire song
song4_low = song4.low_pass_filter(500)
print("\n *** NOW PLAYING *** \n We Wish You A Merry Christmas on the Random Synthesizer! (with a low-pass filter at a cutoff frequency of 500Hz)")
# play(song4_low)

song4_high = song4.high_pass_filter(5000)
print("\n *** NOW PLAYING *** \n We Wish You A Merry Christmas on the Random Synthesizer! (with a high-pass filter at a cutoff frequency of 5000Hz)")
# play(song4_high)

# 1. Sine, 2. Sawtooth, 3. Trumpet, 4. Random (random Fourier coefficients)
song = song1 + song2 + song3 + song4 + song4_low + song4_high
# play(song)

# Combine all 4 songs and export to an mp3 file!
# song.export("Lucas-Pao-Gened-1080-Electronics-Project-Composition.mp3")
