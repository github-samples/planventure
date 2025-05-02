import pytest
from models import Trip
from datetime import datetime, timedelta

def test_new_trip(test_app, test_db, test_user):
    """Test creating a new trip"""
    start_date = datetime.now()
    end_date = start_date + timedelta(days=5)
    
    trip = Trip(
        user_id=test_user.id,
        destination='Tokyo',
        start_date=start_date,
        end_date=end_date
    )
    
    assert trip.destination == 'Tokyo'
    assert trip.user_id == test_user.id
    assert trip.start_date == start_date
    assert trip.end_date == end_date

def test_trip_to_dict(test_app, test_db, test_trip):
    """Test trip serialization"""
    trip_dict = test_trip.to_dict()
    
    assert trip_dict['destination'] == 'Paris'
    assert 'start_date' in trip_dict
    assert 'end_date' in trip_dict
    assert 'itinerary' in trip_dict

def test_trip_dates_validation(test_app, test_db, test_user):
    """Test trip dates validation"""
    start_date = datetime.now()
    end_date = start_date - timedelta(days=1)  # End date before start date
    
    with pytest.raises(ValueError):
        Trip(
            user_id=test_user.id,
            destination='Berlin',
            start_date=start_date,
            end_date=end_date
        )