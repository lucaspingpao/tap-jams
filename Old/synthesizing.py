#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Dec 13 19:58:10 2020

@author: lucaspao
"""


from helpers import *

# Chords
C4 = createNote(noteName="C4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
Db4 = createNote(noteName="Db4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
D4 = createNote(noteName="D4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
E4 = createNote(noteName="E4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
F4 = createNote(noteName="F4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
Gb4 = createNote(noteName="Gb4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
G4 = createNote(noteName="G4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
Ab4 = createNote(noteName="Ab4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
A4 = createNote(noteName="A4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
Bb4 = createNote(noteName="Bb4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
B4 = createNote(noteName="B4", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
C5 = createNote(noteName="C5", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
Db5 = createNote(noteName="Db5", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
D5 = createNote(noteName="D5", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
Eb5 = createNote(noteName="Eb5", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
E5 = createNote(noteName="E5", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
F5 = createNote(noteName="F5", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)
Gb5 = createNote(noteName="Gb5", type="sine", amp=1/4, beats=1.0, filter=None, cutoff=None)

C4.export("./static/audio/C.mp3")
Db4.export("./static/audio/Db.mp3")
D4.export("./static/audio/D.mp3")
Eb4.export("./static/audio/Eb.mp3")
E4.export("./static/audio/E.mp3")
F4.export("./static/audio/F.mp3")
Gb4.export("./static/audio/Gb.mp3")
G4.export("./static/audio/G.mp3")
Ab4.export("./static/audio/Ab.mp3")
A4.export("./static/audio/A.mp3")
Bb4.export("./static/audio/Bb.mp3")
B4.export("./static/audio/B.mp3")
C5.export("./static/audio/Chigh.mp3")
Db5.export("./static/audio/Dbhigh.mp3")
D5.export("./static/audio/Dhigh.mp3")
Eb5.export("./static/audio/Ebhigh.mp3")
E5.export("./static/audio/Ehigh.mp3")
F5.export("./static/audio/Fhigh.mp3")
Gb5.export("./static/audio/Gbhigh.mp3")

CMajor = createChord([C4,E4,G4]); CMajor.export("./static/audio/CMajor.mp3")
DbMajor = createChord([Db4,F4,Ab4]); DbMajor.export("./static/audio/DbMajor.mp3")
DMajor = createChord([D4,Gb4,A4]); DMajor.export("./static/audio/DMajor.mp3")
EbMajor = createChord([Eb4,G4,Bb4]); EbMajor.export("./static/audio/EbMajor.mp3")
EMajor = createChord([E4,Ab4,B4]); EMajor.export("./static/audio/EMajor.mp3")
FMajor = createChord([F4,A4,C5]); FMajor.export("./static/audio/FMajor.mp3")
GbMajor = createChord([Gb4,Bb4,Db5]); GbMajor.export("./static/audio/GbMajor.mp3")
GMajor = createChord([G4,B4,D5]); GMajor.export("./static/audio/GMajor.mp3")
AbMajor = createChord([Ab4,C5,Eb5]); AbMajor.export("./static/audio/AbMajor.mp3")
AMajor = createChord([A4,Db5,E5]); AMajor.export("./static/audio/AMajor.mp3")
BbMajor = createChord([Bb4,D5,F5]); BbMajor.export("./static/audio/BbMajor.mp3")
BMajor = createChord([B4,Eb5,Gb5]); BMajor.export("./static/audio/BMajor.mp3")
