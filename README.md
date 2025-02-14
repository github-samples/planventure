# Planventure API 🚁

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/github-samples/planventure)

A Flask-based REST API backend for the Planventure application.

## Prerequisites
Before you begin, ensure you have the following:

- A GitHub account - [sign up for FREE](https://github.com)
- Access to GitHub Copilot - [sign up for FREE](https://gh.io/gfb-copilot)!
- A Code Editor - [VS Code](https://code.visualstudio.com/download) is recommended
- API Client (like [Bruno](https://github.com/usebruno/bruno))
- Git - [Download & Install Git](https://git-scm.com/downloads)

## 🚀 Getting Started

## Build along in a Codespace

1. Click the "Open in GitHub Codespaces" button above to start developing in a GitHub Codespace.

### Local Development Setup

If you prefer to develop locally, follow the steps below:

1. Clone the repository to your local machine and switch to the `apistart` branch:
```sh
git clone https://github.com/github-samples/planventure.git
git switch apistart
```

2. Create a virtual environment and activate it:
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Navigate to the [planventure-api](/planventure-api/) directory:
```sh
cd planventure-api
```

4. Install the required dependencies:
```sh
pip install -r requirements.txt
```

5. Create an `.env` file based on [.sample.env](.sample.env):
```sh
cp .sample.env .env
```

6. Start the Flask development server:
```sh
flask run --debug
```

## 📚 API Endpoints
- GET / - Welcome message
- GET /health - Health check endpoint

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Footer