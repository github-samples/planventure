from os import environ
from dotenv import load_dotenv

load_dotenv()

class Config:
    # CORS Settings
    CORS_ORIGINS = environ.get(
        'CORS_ORIGINS',
        'http://localhost:3000,http://localhost:5173'
    ).split(',')
    
    CORS_HEADERS = [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Credentials'
    ]
    
    CORS_METHODS = [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'OPTIONS'
    ]
    
    # Cookie Settings
    CORS_SUPPORTS_CREDENTIALS = True
