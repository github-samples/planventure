import pytest
from .validators import validate_email, validate_username

def test_valid_emails():
    """Test validation of properly formatted email addresses"""
    valid_emails = [
        "test@example.com",
        "user.name@domain.com",
        "user+tag@example.co.uk",
        "123@domain.com",
        "user@sub.domain.com"
    ]
    for email in valid_emails:
        assert validate_email(email) is True

def test_invalid_emails():
    """Test validation of improperly formatted email addresses"""
    invalid_emails = [
        "test@.com",
        "@domain.com",
        "test@domain",
        "test@domain.",
        "test.domain.com",
        "test@domain@.com",
        "test space@domain.com"
    ]
    for email in invalid_emails:
        assert validate_email(email) is False

def test_edge_cases():
    """Test validation with edge cases"""
    assert validate_email("") is False
    with pytest.raises(TypeError):
        validate_email(None)

def test_valid_usernames():
    """Test validation of properly formatted usernames"""
    valid_usernames = [
        "user123",
        "_user",
        "john_doe",
        "a123",
        "Developer42",
        "code_master",
        "Alice_Bob_123"
    ]
    for username in valid_usernames:
        assert validate_username(username) is True

def test_invalid_usernames():
    """Test validation of improperly formatted usernames"""
    invalid_usernames = [
        "ab",  # too short
        "a" * 17,  # too long
        "123user",  # starts with number
        "__user",  # multiple underscores at start
        "user name",  # contains space
        "user@name",  # special character
        "-user",  # starts with hyphen
        "user-",  # ends with hyphen
    ]
    for username in invalid_usernames:
        assert validate_username(username) is False

def test_username_edge_cases():
    """Test username validation with edge cases"""
    assert validate_username("") is False
    with pytest.raises(TypeError):
        validate_username(None)