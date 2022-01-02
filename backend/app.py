from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
# from flask_sqlalchemy import SQLAlchemy

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