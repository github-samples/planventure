import re

def validate_email(email: str) -> bool:
    """Validate email format using regex pattern"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_username(username: str) -> bool:
    """
    Validates a username according to the following rules:
    - Between 3 and 16 characters
    - Starts with a letter or single underscore
    - Can contain letters, numbers, and underscores after first character
    - No spaces or special characters
    
    Args:
        username: The username to validate
        
    Returns:
        bool: True if username is valid, False otherwise
        
    Raises:
        TypeError: If username is None
    """
    if username is None:
        raise TypeError("Username cannot be None")
        
    # Check for empty string
    if not username:
        return False
        
    # Check length (3-16 characters)
    if len(username) < 3 or len(username) > 16:
        return False
        
    # Pattern explanation:
    # ^            - Start of string
    # [a-zA-Z_]    - First character must be letter or underscore
    # (?!_)        - Negative lookahead to prevent multiple underscores at start
    # [a-zA-Z0-9_] - Remaining characters can be letters, numbers, or underscores
    # {2,15}       - Length of remaining characters (2-15, plus first character = 3-16 total)
    # $            - End of string
    pattern = r'^[a-zA-Z_](?!_)[a-zA-Z0-9_]{2,15}$'
    
    return bool(re.match(pattern, username))
