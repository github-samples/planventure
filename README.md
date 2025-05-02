# Planventure API

A Flask-based REST API that powers the Planventure trip planning application. This API provides authentication, trip management, and itinerary generation features.

Followed [this tutorial by GitHub](https://youtu.be/CJUbQ1QiBUY) to use MS Copilot to create an API in Python!

## Features

- User authentication with JWT tokens
- Trip CRUD operations 
- Automated itinerary generation
- Database persistence with SQLAlchemy
- CORS support for frontend integration
- Email verification system
- Health check endpoint

## Tech Stack

- Python 3.8+
- Flask web framework
- SQLAlchemy ORM
- JWT authentication
- SQLite database (configurable for PostgreSQL)
- CORS middleware

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip package manager
- Virtual environment tool (recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/planventure-api.git
cd planventure-api
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install the required dependencies:
```bash
pip install -r requirements.txt
```

4. Create an `.env` file based on [.sample.env](/planventure-api/.sample.env):
```bash
cp .sample.env .env
```

5. Start the Flask development server:
```bash
flask run
```

## 📚 API Endpoints
- GET / - Welcome message
- GET /health - Health check endpoint

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.