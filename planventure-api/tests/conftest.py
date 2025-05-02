import pytest
from app import app, db
from models import User, Trip
from datetime import datetime, timedelta


@pytest.fixture
def test_app():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def test_db():
    return db

@pytest.fixture
def test_user():
    user = User(
        email='test@example.com',
        is_verified=True
    )
    user.password = 'password123'
    return user

@pytest.fixture
def test_trip(test_user):
    return Trip(
        user_id=test_user.id,
        destination='Paris',
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=5),
        latitude=48.8566,
        longitude=2.3522,
        itinerary={'day1': ['Visit Eiffel Tower']}
    )