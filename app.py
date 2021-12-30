#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Dec  6 15:47:46 2020

@author: lucaspao
"""

from flask import Flask, render_template, request, session
# from synth import *
from helpers import *
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route('/', methods=["GET", "POST"])
def index():
    errorMessage = ""
    validNotes = ["A", "B", "C", "D", "E", "F", "G", "Ab", "Bb", "Db", "Eb", "Gb"]
    validChords = []
    
    for note in validNotes:
        validChords.append(note + "Major")
        validChords.append(note + "Minor")
    
    if request.method == "GET":
        return render_template("index.html", error=errorMessage)
    if request.method == "POST":
        
        melodyInstrument = request.form.get('melodyInstrument')
        harmonyInstrument = request.form.get('harmonyInstrument')
        noteNames = [
            request.form.get("m1b1"),
            request.form.get("m1b2"),
            request.form.get("m1b3"),
            request.form.get("m1b4"),
            request.form.get("m2b1"),
            request.form.get("m2b2"),
            request.form.get("m2b3"),
            request.form.get("m2b4"),
            request.form.get("m3b1"),
            request.form.get("m3b2"),
            request.form.get("m3b3"),
            request.form.get("m3b4"),
            request.form.get("m4b1"),
            request.form.get("m4b2"),
            request.form.get("m4b3"),
            request.form.get("m4b4")
        ]
        
        notes = []
        for note in noteNames:
            if not note:
                errorMessage = "Missing input(s). Please type in a note. e.g. A or Ab."
                return render_template("index.html", error=errorMessage)
            if note not in validNotes:
                errorMessage = "Please type in a valid note. e.g. A or Ab."
                return render_template("index.html", error=errorMessage)
            notes.append(note + str(5))
        
        harmony = [
            request.form.get("m1b1Hnote") + request.form.get("m1b1Hchord"),
            request.form.get("m1b1Hnote") + request.form.get("m1b1Hchord"),
            request.form.get("m1b3Hnote") + request.form.get("m1b3Hchord"),
            request.form.get("m1b3Hnote") + request.form.get("m1b3Hchord"),
            request.form.get("m2b1Hnote") + request.form.get("m2b1Hchord"),
            request.form.get("m2b1Hnote") + request.form.get("m2b1Hchord"),
            request.form.get("m2b3Hnote") + request.form.get("m2b3Hchord"),
            request.form.get("m2b3Hnote") + request.form.get("m2b3Hchord"),
            request.form.get("m3b1Hnote") + request.form.get("m3b1Hchord"),
            request.form.get("m3b1Hnote") + request.form.get("m3b1Hchord"),
            request.form.get("m3b3Hnote") + request.form.get("m3b3Hchord"),
            request.form.get("m3b3Hnote") + request.form.get("m3b3Hchord"),
            request.form.get("m4b1Hnote") + request.form.get("m4b1Hchord"),
            request.form.get("m4b1Hnote") + request.form.get("m4b1Hchord"),
            request.form.get("m4b3Hnote") + request.form.get("m4b3Hchord"),
            request.form.get("m4b3Hnote") + request.form.get("m4b3Hchord")
        ]
        
        for chord in harmony:
            if chord == "Major" or chord == "Minor":
                errorMessage = "Missing input(s). Please type in a note. e.g. A or Ab."
                return render_template("index.html", error=errorMessage)
            if chord not in validChords:
                errorMessage = "Please type in a valid note. e.g. A or Ab."
                return render_template("index.html", error=errorMessage)
        
        songTitle = request.form.get('songTitle')
        
        song = mixTracks(notes, harmony, melodyInstrument, harmonyInstrument)
        song.export('./static/audio/mySong.mp3')
        
        return render_template("index.html", error=errorMessage, title=songTitle)

@app.route('/about')
def about():
    return render_template("about.html")

if __name__ == "__main__":
    app.run(debug=True)
    
    
