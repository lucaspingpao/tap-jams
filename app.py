from flask import Flask, request, send_from_directory
from flask_cors import CORS, cross_origin
# from flask_sqlalchemy import SQLAlchemy
import json
# from backend.helpers import *

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
#cors = CORS(app)

# app.config['SQLACHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'mysql://root:''@localhost/flask'

@app.route('/')
#@cross_origin
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api', methods=['GET'])
#@cross_origin
def testing():
    return {
        "testing the api works here": "Heroku"
    }

# @app.route('/rhythm', methods=['POST'])
# #@cross_origin
# def rhythm():
#     data = json.loads(request.get_data().decode())
#     tracks = {}
#     for instrument in data['sounds'].keys():
#         tracks['../frontend/src/assets/sounds/' + instrument + '/' + data['sounds'][instrument]] = data['filled'][instrument]
#     mix_drums(tracks, 250)
#     return request.data

# @app.route('/harmony', methods=['POST'])
# #@cross_origin
# def harmony():
#     data = json.loads(request.get_data().decode())
#     mix_chords(data, 1000)
#     return request.data

# @app.route('/play', methods=['POST'])
# #@cross_origin
# def global_play():
#     drums = AudioSegment.from_wav('../frontend/src/assets/sounds/test_drums.wav')
#     chords = AudioSegment.from_wav('../frontend/src/assets/sounds/test_piano.wav')
#     song = drums.overlay(chords)
#     play(song)
#     return request.data

if __name__ == '__main__':
    app.run()
