from pydub import AudioSegment
from scipy.io import wavfile
from pydub.playback import play # Used for playing sound in Python

sample_song = {
    '../frontend/src/assets/sounds/Cymbal/Boom.wav': '1000000000000000',
    '../frontend/src/assets/sounds/Hi-Hats/ClosedHat.wav': '1111111111111111',
    '../frontend/src/assets/sounds/Kick/Kick.wav': '1000000010000000',
    '../frontend/src/assets/sounds/Snare/Snare.wav': '0000100000001000',
}

def mix_tracks(sounds, beat_time):
    chord = None
    for s in sounds:
        if not chord:
            chord = s[:beat_time]
        else:
            chord = chord[:beat_time].overlay(s[:beat_time])
    return chord

def mix_drums(song_data, beat_time):
    song = AudioSegment.empty()
    for beat in range(16):
        processing_sounds = [AudioSegment.from_wav(i) for i in song_data.keys() if song_data[i][beat] == '1']
        if processing_sounds:
            # next = mix_tracks(processing_sounds, beat_time)
            # print(next.duration_seconds)
            song += mix_tracks(processing_sounds, beat_time)
        else:
            song += AudioSegment.silent(beat_time)
    song += AudioSegment.silent(beat_time)
    play(song)
    song.export('../frontend/src/assets/sounds/test_drums.wav', format='wav')
    return song

def mix_chords(chords, measure_time):
    song = sum([AudioSegment.from_wav('../frontend/src/assets/sounds/Piano Chords/' + c + '.wav')[:measure_time] for c in chords])
    play(song)
    song.export('../frontend/src/assets/sounds/test_piano.wav', format='wav')
    return song

# drums = AudioSegment.from_wav('../frontend/src/assets/sounds/test_drums.wav')
# chords = AudioSegment.from_wav('../frontend/src/assets/sounds/test_piano.wav')
# song = drums.overlay(chords)
# song.export('../frontend/src/assets/sounds/test_mix.wav', format='wav')
