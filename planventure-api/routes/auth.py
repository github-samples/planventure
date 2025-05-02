from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, db
from middleware.auth_middleware import require_auth

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and user.check_password(data.get('password')):
        token = user.generate_auth_token()
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user.id,
                'email': user.email,
            }
        })
    
    return jsonify({'message': 'Invalid credentials'}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'message': 'Email already registered'}), 400
        
    user = User(email=data.get('email'))
    user.password = data.get('password')
    
    db.session.add(user)
    db.session.commit()
    
    token = user.generate_auth_token()
    return jsonify({'token': token}), 201

@auth_bp.route('/protected', methods=['GET'])
@require_auth
def protected():
    current_user_id = get_jwt_identity()
    return jsonify({'user_id': current_user_id}), 200
