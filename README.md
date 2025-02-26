# Simple Authentication System

A lightweight authentication system built with Node.js and Express for the backend, and vanilla JavaScript for the frontend. The system features user registration, login functionality, and a clean, responsive UI with dark/light theme support.

## Features

- User registration and login
- Secure password hashing using bcrypt
- Persistent user data storage in JSON
- Responsive design
- Dark/Light theme toggle
- Simple dashboard interface
- CORS enabled for API access

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
bash
git clone <repository-url>
cd authentication-system

3. Install dependencies:
bash
npm install

5. Start the server:
bash
node server_auth.js

The server will start running at `http://localhost:3000`

## Project Structure
authentication-system/
├── server_auth.js # Express server and API endpoints
├── auth.html # Frontend HTML
├── auth.css # Styling
├── auth.js # Frontend JavaScript
├── users.json # User data storage
└── README.md


## API Endpoints

### POST /api/register
Register a new user
- Required fields: name, email, password
- Returns: Success message or error

### POST /api/login
Authenticate a user
- Required fields: email, password
- Returns: User data (excluding password) or error

## Security Features

- Passwords are hashed using bcrypt
- Sensitive data is never sent to the client
- Input validation on both client and server side
- CORS protection

## Frontend Features

- Clean and responsive UI
- Form validation
- Smooth transitions between forms
- Dark/Light theme toggle
- User dashboard
- Session management

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
