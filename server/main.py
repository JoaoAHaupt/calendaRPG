from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models.session import Session
from models.campaign import Campaign
from models.user import User
from database import db_session

app = Flask(__name__)
cors = CORS(app, origins="*")

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
    user_id = data.get('user_id')

    if not name:
        return jsonify({'error': 'Missing name'}), 400

    new_campaign = Campaign(name=name, 
                        description=description, 
                        hex_color=hex_color, 
                        user_id=user_id)
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
        return jsonify({'error': 'Missing name or campaign_id'}), 400

    new_session = Session(date=data,description=description, campaign_id=campaign_id)
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
        'user_id': campaign.user_id
    } for campaign in campaigns])


if __name__ == '__main__':
    from database import init_db
    
    init_db()
    app.run(debug=True)
