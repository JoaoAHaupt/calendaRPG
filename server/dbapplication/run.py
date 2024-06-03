from flask import Flask
from flask_cors import CORS
from app import create_app

flask_app = create_app()
CORS(flask_app)

if __name__ == '__main__':
    flask_app.run(host='0.0.0.0', debug=True, port=8000)
