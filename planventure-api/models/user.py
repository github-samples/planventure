from .base import BaseModel
from app import db
import bcrypt
from flask_jwt_extended import create_access_token
from datetime import datetime, timezone

class User(BaseModel):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    verification_token = db.Column(db.String(100), unique=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    # Add relationship
    trips = db.relationship('Trip', back_populates='user', lazy='dynamic')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        # Generate a salt and hash the password
        salt = bcrypt.gensalt()
        password_bytes = password.encode('utf-8')
        self.password_hash = bcrypt.hashpw(password_bytes, salt).decode('utf-8')

    def check_password(self, password):
        # Verify the password against the hash
        return bcrypt.checkpw(
            password.encode('utf-8'),
            self.password_hash.encode('utf-8')
        )

    def generate_auth_token(self):
        # Convert user.id to string when creating the token
        return create_access_token(identity=str(self.id))

    def to_dict(self):
        try:
            return {
                'id': self.id,
                'email': self.email,
                'is_verified': self.is_verified,
                'created_at': self.created_at.isoformat() if self.created_at else None,
                'updated_at': self.updated_at.isoformat() if self.updated_at else None
            }
        except AttributeError:
            return {
                'id': self.id if hasattr(self, 'id') else None,
                'email': self.email if hasattr(self, 'email') else None,
                'is_verified': self.is_verified if hasattr(self, 'is_verified') else False,
                'created_at': None,
                'updated_at': None
            }

    def __repr__(self):
        return f'<User {self.email}>'
