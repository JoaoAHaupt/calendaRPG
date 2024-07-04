from datetime import datetime
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
    id = str(data.get('id'))
    email = data.get('email')
    
    
    resp = make_response(jsonify({'message': 'Cookies set successfully'}))
    resp.set_cookie('id', id, max_age=7200)
    resp.set_cookie('email', email,max_age=7200)
    resp.set_cookie('username', username, max_age=7200)
            
    return resp, 200


@app.route('/get_cookies', methods=['GET'])
def get_cookies():
    username = request.cookies.get('username')
    email = request.cookies.get('email')
    id = request.cookies.get('id')


    return jsonify({'id':id,'username': username, 'email': email})

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

    date_str = data.get('date')
    description = data.get('description')
    campaign_id = data.get('campaign_id')

    if not date_str or not campaign_id:
        return jsonify({'error': 'Missing date or campaign_id'}), 400

    try:
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400

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

@app.route('/get_user', methods=['POST'])
def get_user():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'No email or password provided'}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'id': user.id,
        'email': user.email,
        'username': user.username
    }), 200

@app.route('/get_campaigns_user', methods=['GET'])
def get_campaigns_user():
    dm_id = request.args.get('dm_id')

    if not dm_id:
        return jsonify({'error': 'No id provided'}), 400

    campaigns = Campaign.query.filter_by(dm_id=dm_id).all()

    if not campaigns:
        return jsonify({'error': 'No campaigns found'}), 404

    campaigns_list = [{
        'id': campaign.id,
        'name': campaign.name,
        'description': campaign.description,
        'hex_color': campaign.hex_color
    } for campaign in campaigns]

    return jsonify(campaigns_list), 200

if __name__ == '__main__':
    from database import init_db
    init_db()
    app.run(debug=True)