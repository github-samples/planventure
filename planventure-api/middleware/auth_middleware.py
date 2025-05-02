from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
            # Convert string ID back to integer if needed
            current_user_id = int(get_jwt_identity())
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'message': 'Authentication required'}), 401
    return decorated