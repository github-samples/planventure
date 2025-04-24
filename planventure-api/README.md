# Planventure API 🌍✈️

A Flask-based REST API for managing travel itineraries and trip planning.

## Features

- 🔐 User Authentication (JWT-based)
- 🗺️ Trip Management
- 📅 Itinerary Planning
- 🔒 Secure Password Hashing
- ⚡ CORS Support

## Tech Stack

- Python 3.x
- Flask
- SQLAlchemy
- Flask-JWT-Extended
- SQLite Database
- BCrypt for password hashing

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "secure_password"
  }
  ```

- `POST /auth/login` - Login and get JWT token
  ```json
  \{
  "email": "user@example.com",
  "password": "secure_password"
}
  ```

### Trips

- `GET /trips` - Get all trips
- `POST /trips` - Create a new trip
  ```json
  {
    "destination": "Paris, France",
    "start_date": "2024-06-15T00:00:00Z",
    "end_date": "2024-06-22T00:00:00Z",
    "latitude": 48.8566,
    "longitude": 2.3522,
    "itinerary": {}
  }
  ```
- `GET /trips/<trip_id>` - Get a single trip
- `PUT /trips/<trip_id>` - Update a trip
- `DELETE /trips/<trip_id>` - Delete a trip




