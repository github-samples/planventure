from app import db
from .base import BaseModel
from .user import User
from .trip import Trip

# Add all models here for easy importing
__all__ = [
    'BaseModel',
    'User',
    'Trip'
]
