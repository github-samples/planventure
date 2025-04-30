from app import app, db, init_db
from models import *  # This will import all models

if __name__ == '__main__':
    print("Creating all database tables...")
    init_db()
    print("Database tables created successfully!")
