from flask import Blueprint, request, jsonify, current_app, make_response
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from flask_cors import cross_origin
from config import Config
from app import db
from models import Trip
from middleware.auth import auth_middleware
from datetime import datetime
import logging
from utils.itinerary import generate_default_itinerary

trips_bp = Blueprint('trips', __name__)

def validate_auth_header():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return False, 'Authorization header is missing'
    if not auth_header.startswith('Bearer '):
        return False, 'Invalid authorization format. Use Bearer token'
    return True, None

@trips_bp.route('/trips', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin(
    origins=Config.CORS_ORIGINS,
    methods=Config.CORS_METHODS,
    allow_headers=Config.CORS_HEADERS,
    supports_credentials=Config.CORS_SUPPORTS_CREDENTIALS
)
@auth_middleware
def handle_trips():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Methods', ','.join(Config.CORS_METHODS))
        response.headers.add('Access-Control-Allow-Headers', ','.join(Config.CORS_HEADERS))
        return response
    
    try:
        # Log incoming request details
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        current_app.logger.debug(f"Received token: {token[:10]}...")  # Log first 10 chars for safety
        
        # Verify JWT token explicitly
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        current_app.logger.debug(f"Authenticated user_id: {user_id}")
        
        if request.method == 'POST':
            return create_trip()
        return get_trips()
    except Exception as e:
        current_app.logger.error(f"Authentication error: {str(e)}")
        return jsonify({'error': str(e)}), 401

def create_trip():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()
        
        if not user_id:
            return jsonify({'error': 'Invalid user token'}), 401

        # Rest of the create_trip function remains the same
        required_fields = ['destination', 'start_date', 'end_date']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        start_date = datetime.fromisoformat(data['start_date'].replace('Z', '+00:00'))
        end_date = datetime.fromisoformat(data['end_date'].replace('Z', '+00:00'))
        
        # Generate default itinerary if none provided
        itinerary = data.get('itinerary', generate_default_itinerary(start_date, end_date))
        
        trip = Trip(
            user_id=user_id,
            destination=data['destination'],
            start_date=start_date,
            end_date=end_date,
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            itinerary=itinerary
        )
        
        db.session.add(trip)
        db.session.commit()
        
        return jsonify({
            'message': 'Trip created successfully',
            'trip_id': trip.id
        }), 201
    except ValueError as ve:
        return jsonify({'error': 'Invalid date format'}), 400
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Create trip error: {str(e)}")
        return jsonify({'error': 'Failed to create trip'}), 500

def get_trips():
    user_id = get_jwt_identity()
    trips = Trip.query.filter_by(user_id=user_id).all()
    
    return jsonify({
        'trips': [{
            'id': trip.id,
            'destination': trip.destination,
            'start_date': trip.start_date.isoformat(),
            'end_date': trip.end_date.isoformat(),
            'latitude': trip.latitude,
            'longitude': trip.longitude,
            'itinerary': trip.itinerary
        } for trip in trips]
    }), 200

@trips_bp.route('/trips/<int:trip_id>', methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
@cross_origin(
    origins=Config.CORS_ORIGINS, 
    methods=Config.CORS_METHODS,
    allow_headers=Config.CORS_HEADERS,
    supports_credentials=Config.CORS_SUPPORTS_CREDENTIALS
)
@auth_middleware
def handle_trip(trip_id):
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Methods', ','.join(Config.CORS_METHODS))
        response.headers.add('Access-Control-Allow-Headers', ','.join(Config.CORS_HEADERS)) 
        return response
    
    if request.method == 'GET':
        return get_trip(trip_id)
    elif request.method == 'PUT':
        return update_trip(trip_id)
    elif request.method == 'DELETE':
        return delete_trip(trip_id)

def get_trip(trip_id):
    user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first()
    
    if not trip:
        return jsonify({'error': 'Trip not found'}), 404
        
    return jsonify({
        'id': trip.id,
        'destination': trip.destination,
        'start_date': trip.start_date.isoformat(),
        'end_date': trip.end_date.isoformat(),
        'latitude': trip.latitude,
        'longitude': trip.longitude,
        'itinerary': trip.itinerary
    }), 200

def update_trip(trip_id):
    user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first()
    
    if not trip:
        return jsonify({'error': 'Trip not found'}), 404
        
    data = request.get_json()
    
    try:
        if 'destination' in data:
            trip.destination = data['destination']
        if 'start_date' in data or 'end_date' in data:
            start_date = datetime.fromisoformat(data.get('start_date', trip.start_date.isoformat()).replace('Z', '+00:00'))
            end_date = datetime.fromisoformat(data.get('end_date', trip.end_date.isoformat()).replace('Z', '+00:00'))
            # Generate new itinerary template for new dates if itinerary is not provided
            if 'itinerary' not in data:
                data['itinerary'] = generate_default_itinerary(start_date, end_date)
        if 'latitude' in data:
            trip.latitude = data['latitude']
        if 'longitude' in data:
            trip.longitude = data['longitude']
        if 'itinerary' in data:
            trip.itinerary = data['itinerary']
            
        db.session.commit()
        return jsonify({'message': 'Trip updated successfully'}), 200
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update trip'}), 500

def delete_trip(trip_id):
    user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first()
    
    if not trip:
        return jsonify({'error': 'Trip not found'}), 404
        
    try:
        db.session.delete(trip)
        db.session.commit()
        return jsonify({'message': 'Trip deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete trip'}), 500

@trips_bp.errorhandler(405)
def method_not_allowed(e):
    return jsonify({'error': 'Method not allowed'}), 405
