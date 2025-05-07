from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required, verify_jwt_in_request
from models import Trip, db
from middleware.auth_middleware import require_auth
from datetime import datetime, timedelta

trips_bp = Blueprint('trips', __name__)

def generate_default_itinerary(start_date, end_date):
    """
    Generate a default itinerary template based on trip dates
    """
    itinerary = {}
    current_date = start_date
    day_count = 1

    while current_date <= end_date:
        day_key = f"day{day_count}"
        itinerary[day_key] = {
            "date": current_date.strftime('%Y-%m-%d'),
            "activities": [
                {"time": "09:00", "activity": "Breakfast", "location": ""},
                {"time": "10:00", "activity": "Morning Activity", "location": ""},
                {"time": "13:00", "activity": "Lunch", "location": ""},
                {"time": "14:00", "activity": "Afternoon Activity", "location": ""},
                {"time": "19:00", "activity": "Dinner", "location": ""}
            ]
        }
        current_date += timedelta(days=1)
        day_count += 1

    return itinerary

@trips_bp.route('/trips', methods=['POST'])
@jwt_required()
def create_trip():
    verify_jwt_in_request()
    current_user_id = get_jwt_identity()
    
    try:
        data = request.get_json()
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
        
        # Generate or use provided itinerary
        if 'itinerary' in data and data['itinerary']:
            itinerary = data['itinerary']
        else:
            itinerary = generate_default_itinerary(start_date, end_date)
        
        new_trip = Trip(
            user_id=current_user_id,
            destination=data['destination'],
            start_date=start_date,
            end_date=end_date,
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            itinerary=itinerary
        )
        
        db.session.add(new_trip)
        db.session.commit()
        return jsonify({
            'message': 'Trip created',
            'trip_id': new_trip.id,
            'itinerary': itinerary
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 400

@trips_bp.route('/trips', methods=['GET'])
@jwt_required()  # This makes authentication required
def get_trips():
    current_user_id = get_jwt_identity()
    trips = Trip.query.filter_by(user_id=current_user_id).all()
    return jsonify([trip.to_dict() for trip in trips]), 200

@trips_bp.route('/trips/<int:trip_id>', methods=['GET'])
@jwt_required()  # This makes authentication required
def get_trip(trip_id):
    current_user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=current_user_id).first()
    
    if not trip:
        return jsonify({'message': 'Trip not found'}), 404
        
    return jsonify(trip.to_dict()), 200

@trips_bp.route('/trips/<int:trip_id>', methods=['PUT'])
@jwt_required()  # This makes authentication required
def update_trip(trip_id):
    current_user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=current_user_id).first()
    
    if not trip:
        return jsonify({'message': 'Trip not found'}), 404
        
    data = request.get_json()
    
    try:
        if 'destination' in data:
            trip.destination = data['destination']
        if 'start_date' in data:
            trip.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
        if 'end_date' in data:
            trip.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
        if 'coordinates' in data:
            trip.coordinates = data['coordinates']
        if 'itinerary' in data:
            trip.itinerary = data['itinerary']
            
        db.session.commit()
        return jsonify(trip.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 400

@trips_bp.route('/trips/<int:trip_id>', methods=['DELETE'])
@jwt_required()  # This makes authentication required
def delete_trip(trip_id):
    current_user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=current_user_id).first()
    
    if not trip:
        return jsonify({'message': 'Trip not found'}), 404
        
    try:
        db.session.delete(trip)
        db.session.commit()
        return jsonify({'message': 'Trip deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 400