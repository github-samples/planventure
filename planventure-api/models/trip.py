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
        return {
            'id': self.id,
            'user_id': self.user_id,
            'destination': self.destination,
            'start_date': self.start_date.strftime('%Y-%m-%d'),
            'end_date': self.end_date.strftime('%Y-%m-%d'),
            'latitude': self.latitude,
            'longitude': self.longitude,
            'itinerary': self.itinerary,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
