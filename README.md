# Planventure API Server 🚀

A Flask backend API that powers the Planventure travel planning application. This guide will help you quickly get the server running so you can focus on building the client application.

## Quick Start

1. Fork and clone the repository:
```sh
git clone https://github.com/yourusername/planventure.git
cd planventure/planventure-api
```

2. Set up Python environment and install dependencies:
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Start the development server:
```sh
flask run
```

The API server will be running at `http://localhost:5000`

That's it! You can now proceed to set up and work on the client application.

## API Health Check

Verify the server is running:
```sh
curl http://localhost:5000/health
```

Expected response: `{"status": "healthy"}`

# Planventure Client ✈️

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/github-samples/planventure)

A React-based travel planning application that helps you organize your trips, manage itineraries, and keep track of travel details.

## Features

- 🗺️ Trip Planning & Management
- 📅 Interactive Itinerary Builder
- 🏨 Accommodation Tracking
- 🚗 Transportation Management
- 📱 Responsive Design
- 🔐 Secure Authentication

## Prerequisites

Before you begin, ensure you have the following:
- Node.js (v16 or higher)
- npm or yarn
- A GitHub account
- Access to GitHub Copilot - [sign up for FREE](https://gh.io/gfb-copilot)!
- Git - [Download & Install Git](https://git-scm.com/downloads)

## 🚀 Getting Started

### Quick Start with Codespaces

1. Click the "Open in GitHub Codespaces" button above
2. Wait for the environment to build
3. Run `npm install` and `npm run dev`

### Local Development Setup

1. Open a new terminal window and cd into the `planventure-client` directory:
```sh
cd planventure/planventure-client
```

2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file:
```sh
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```sh
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🏗️ Tech Stack

- React
- Material-UI
- React Router
- Day.js
- Vite

## 📱 Features Overview

### Trip Management
- Create and manage trips
- Set destinations and dates
- Track accommodations and transportation

### Itinerary Planning
- Day-by-day planning
- Activity scheduling
- Time management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.