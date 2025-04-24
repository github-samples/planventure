from datetime import datetime, timezone
from flask_jwt_extended import create_access_token
from app import db
from utils.password import hash_password, check_password

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Add relationship
    trips = db.relationship('Trip', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = hash_password(password)

    def verify_password(self, password):
        return check_password(password, self.password_hash)

    def generate_auth_token(self):
        """Generate JWT token for the user"""
        return create_access_token(identity=(str(self.id)))

    @staticmethod
    def verify_auth_token(token):
        """Verify the auth token - handled by @auth_required decorator"""
        pass

    def __repr__(self):
        return f'<User {self.email}>'
