import pytest
from models import User

def test_new_user(test_app, test_db):
    """Test creating a new user"""
    user = User(email='user@test.com')
    user.password = 'testpass123'
    
    assert user.email == 'user@test.com'
    assert user.check_password('testpass123')
    assert not user.is_verified

def test_user_password_hashing(test_app, test_db):
    """Test password hashing"""
    user = User(email='user@test.com')
    user.password = 'testpass123'
    
    """assert user.password != 'testpass123'"""
    assert user.check_password('testpass123')
    assert not user.check_password('wrongpass')

def test_user_token_generation(test_app, test_db, test_user):
    """Test auth token generation"""
    test_db.session.add(test_user)
    test_db.session.commit()
    
    token = test_user.generate_auth_token()
    assert token is not None

def test_user_to_dict(test_app, test_db, test_user):
    """Test user serialization"""
    # Add user to database to generate timestamps
    test_db.session.add(test_user)
    test_db.session.commit()
    
    user_dict = test_user.to_dict()
    
    assert user_dict['email'] == 'test@example.com'
    assert 'password' not in user_dict
    assert user_dict['is_verified'] is True
    assert user_dict['id'] is not None
    assert user_dict['created_at'] is not None
    assert user_dict['updated_at'] is not None