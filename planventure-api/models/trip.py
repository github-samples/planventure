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
