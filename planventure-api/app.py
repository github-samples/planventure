from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from os import environ
from dotenv import load_dotenv
from datetime import timedelta
from werkzeug.security import generate_password_hash
import secrets

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure SQLAlchemy
app.config['SECRET_KEY'] = environ.get('SECRET_KEY', 'default-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL', 'sqlite:///planventure.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT Configuration
app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY', 'default-jwt-secret')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
jwt = JWTManager(app)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "https://your-production-domain.com"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "expose_headers": ["Content-Range", "X-Content-Range"],
        "supports_credentials": True,
        "max_age": 120  # 2 minutes cache for preflight requests
    }
})

# Initialize extensions
db = SQLAlchemy(app)

# Import models and utilities
from models.user import User
from utils.validators import is_valid_email

# Import blueprints
from routes.auth import auth_bp
from routes.trips import trips_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(trips_bp, url_prefix='/api')

# Basic routes
@app.route('/')
def home():
    return jsonify({"message": "Welcome to PlanVenture API"})

@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "database": "connected" if db.engine.execute("SELECT 1").scalar() else "disconnected"
    })

# Registration routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    if not is_valid_email(email):
        return jsonify({'error': 'Invalid email format'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409

    verification_token = secrets.token_urlsafe(32)
    new_user = User(
        email=email,
        password=generate_password_hash(password),
        verification_token=verification_token
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        # TODO: Send verification email
        return jsonify({
            'message': 'Registration successful',
            'user': new_user.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/api/verify-email/<token>', methods=['GET'])
def verify_email(token):
    user = User.query.filter_by(verification_token=token).first()
    
    if not user:
        return jsonify({'error': 'Invalid verification token'}), 404

    user.is_verified = True
    user.verification_token = None
    
    try:
        db.session.commit()
        return jsonify({
            'message': 'Email verified successfully',
            'user': user.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Verification failed'}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

def init_db():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
