from flask import Flask, jsonify, request
# from flask_sqlalchemy import SQLAlchemy
import json
from helpers import *

app = Flask(__name__)

# app.config['SQLACHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'mysql://root:''@localhost/flask'

@app.route('/api', methods=['GET'])
def testing():
    return {
        "testing the api works here ✅": "Heroku"
    }

@app.route('/rhythm', methods=['POST'])
def rhythm():
    data = json.loads(request.get_data().decode())
    tracks = {}
    for instrument in data['sounds'].keys():
        tracks['../frontend/src/assets/sounds/' + instrument + '/' + data['sounds'][instrument]] = data['filled'][instrument]
    mix_drums(tracks, 250)
    return request.data

@app.route('/harmony', methods=['POST'])
def harmony():
    data = json.loads(request.get_data().decode())
    mix_chords(data, 1000)
    return request.data

@app.route('/play', methods=['POST'])
def global_play():
    drums = AudioSegment.from_wav('/Users/lucaspao/Documents/Coding/tap-jams/frontend/src/assets/sounds/test_drums.wav')
    chords = AudioSegment.from_wav('/Users/lucaspao/Documents/Coding/tap-jams/frontend/src/assets/sounds/test_piano.wav')
    song = drums.overlay(chords)
    play(song)
    return request.data

if __name__ == '__main__':
    app.run()


'''
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)

# app.config['SQLACHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'mysql://root:''@localhost/flask'

@app.route('/api', methods=['GET'])
@cross_origin()
def testing():
    return {
        "testing the api works here ✅": "Heroku"
    }

def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run()
'''