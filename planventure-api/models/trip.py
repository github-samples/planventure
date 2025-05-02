from datetime import datetime
from sqlalchemy import event
from sqlalchemy.orm import validates
from .base import BaseModel
from app import db

class Trip(BaseModel):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    destination = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    itinerary = db.Column(db.JSON)

    # Relationship
    user = db.relationship('User', back_populates='trips')

    def __repr__(self):
        return f'<Trip {self.destination} ({self.start_date} - {self.end_date})>'

    def to_dict(self):
        try:
            return {
                'id': self.id,
                'user_id': self.user_id,
                'destination': self.destination,
                'start_date': self.start_date.strftime('%Y-%m-%d') if self.start_date else None,
                'end_date': self.end_date.strftime('%Y-%m-%d') if self.end_date else None,
                'latitude': self.latitude if self.latitude is not None else None,
                'longitude': self.longitude if self.longitude is not None else None,
                'itinerary': self.itinerary if self.itinerary is not None else {},
                'created_at': self.created_at.isoformat() if self.created_at else None,
                'updated_at': self.updated_at.isoformat() if self.updated_at else None
            }
        except AttributeError as e:
            # Log the error if needed
            return {
                'id': self.id if hasattr(self, 'id') else None,
                'user_id': self.user_id if hasattr(self, 'user_id') else None,
                'destination': self.destination if hasattr(self, 'destination') else None,
                'start_date': None,
                'end_date': None,
                'latitude': None,
                'longitude': None,
                'itinerary': {},
                'created_at': None,
                'updated_at': None
            }

    @validates('start_date', 'end_date')
    def validate_dates(self, key, date):
        if not isinstance(date, datetime):
            raise ValueError(f'{key} must be a datetime object')
        
        if key == 'end_date' and hasattr(self, 'start_date') and self.start_date:
            if date < self.start_date:
                raise ValueError('End date cannot be before start date')
        
        return date

# Add event listener to validate dates before flush
@event.listens_for(Trip, 'before_insert')
@event.listens_for(Trip, 'before_update')
def validate_trip_dates(mapper, connection, target):
    if target.start_date and target.end_date:
        if target.end_date < target.start_date:
            raise ValueError('End date cannot be before start date')
