from flask import render_template, request, Flask, jsonify
from models import User


def register_routes(app, db):
    @app.route('/register', methods=['POST'])
    def register_user():
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 200

    @app.route('/', methods=['GET'])
    def index():
        return jsonify({'users': ['user1', 'user2', 'user3']})
