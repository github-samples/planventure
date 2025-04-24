from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from models import User

def auth_middleware(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()
            
            # Check if user still exists in database
            user = User.query.get(current_user_id)
            if not user:
                return jsonify({"error": "User not found"}), 401
                
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({"error": "Invalid or expired token"}), 401
    return decorated
