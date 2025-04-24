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

1.Fork and clone the repository and navigate to the [planventue-api](/planventure-api/) directory:
```sh
cd planventure-api
```

2. Create a virtual environment and activate it:
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install the required dependencies:
```sh
pip install -r requirements.txt
```

4. Create an `.env` file based on [.sample.env](/planventure-api/.sample.env):
```sh
cp .sample.env .env
```

5. Start the Flask development server:
```sh
flask run
```

## 📚 API Endpoints
- GET / - Welcome message
- GET /health - Health check endpoint

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
