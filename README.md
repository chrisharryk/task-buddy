# Task Buddy 
A MERN stack application for managing your tasks/to-do lists powered by JWTs for secure auth.

## Live Demo
Check out the deployed app [https://task-buddy-ee2n.onrender.com](here)

## Features
**Authentication**: Secure login and registration (JWT-based).

**Task Management**: Add, edit, delete tasks.

**Tech Stack**: React, Node.js, Express, MongoDB.

## Running Locally
1. Clone the repo
   ```
   git clone https://github.com/chrisharryk/task-buddy.git
   ```
2. Install dependencies (in both frontend & the backend folder)
   ```
   cd (frontend/backend)
   npm i
   ```
3. The environment variables are stored on the render console for me, you're going to need your own mongo-url and jwt-secret
4. Run the local server
   ````
   cd server && npm run dev
   cd ../client && npm run dev
   ```
