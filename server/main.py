import datetime
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models.session import Session
from models.campaign import Campaign
from models.user import User
from database import db_session

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

@app.route('/set_cookies', methods=['POST'])
def set_cookies():

    
   
    data = request.json
    
    username = data.get('username')
    email = data.get('email')
    
    
    resp = make_response(jsonify({'message': 'Cookies set successfully'}))
    resp.set_cookie('username', username)
    resp.set_cookie('email', email)
            
    return resp, 200


@app.route('/get_cookies', methods=['GET'])
def get_cookies():
    username = request.cookies.get('username')
    email = request.cookies.get('email')

    print(f"Username cookie: {username}")
    print(f"Email cookie: {email}")

    return jsonify({'username': username, 'email': email})

@app.route('/register', methods=['POST'])
def add_user():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    new_user = User(username=username, email=email, password=password)
    db_session.add(new_user)
    db_session.commit()

    return jsonify({'message': 'User added successfully'}), 201

@app.route('/create_campaign', methods=['POST'])
def add_campaign():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    name = data.get('name')
    description = data.get('description')
    hex_color = data.get('hex_color')
    dm_id = data.get('dm_id')

    if not name:
        return jsonify({'error': 'Missing name'}), 400

    new_campaign = Campaign(name=name, 
                            description=description, 
                            hex_color=hex_color, 
                            dm_id=dm_id)
    db_session.add(new_campaign)
    db_session.commit()

    return jsonify({'message': 'Campaign added successfully'}), 201

@app.route('/create_session', methods=['POST'])
def add_session():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    date = data.get('date')
    description = data.get('description')
    campaign_id = data.get('campaign_id')

    if not date or not campaign_id:
        return jsonify({'error': 'Missing date or campaign_id'}), 400

    new_session = Session(date=date, description=description, campaign_id=campaign_id)
    db_session.add(new_session)
    db_session.commit()

    return jsonify({'message': 'Session added successfully'}), 201

@app.route('/', methods=['GET'])
def get_campaigns():
    campaigns = Campaign.query.all()
    
    return jsonify([{
        'id': campaign.id,
        'name': campaign.name,
        'description': campaign.description,
        'hex_color': campaign.hex_color,
        'dm_id': campaign.dm_id
    } for campaign in campaigns])

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'password': user.password
    } for user in users])

if __name__ == '__main__':
    from database import init_db
    init_db()
    app.run(debug=True)