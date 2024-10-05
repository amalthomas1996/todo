# Todo Management App (MERN Stack)

## Overview

This project is a simple MERN stack application that allows users to manage projects and todos. It includes the ability to create projects, add/edit todos, and export project summaries to GitHub as a secret gist.

## Features

- Create projects and manage todos (add/edit/update/mark as complete).
- Export project summaries as secret GitHub gists in markdown format.
- User authentication (login/signup).
- Responsive UI with Tailwind CSS.

## Setup Instructions

### Backend Setup
1. Install dependencies:
    ```bash
    cd backend
    npm install
    ```

2. Set up environment variables:
    - Create a `.env` file in the root of the `backend` folder.
    - Add the following environment variables:
      ```
      MONGO_URI=your_mongo_db_uri
      GITHUB_TOKEN=your_github_token
      JWT_SECRET=your_jwt_secret
      ```

3. Run the backend:
    ```bash
    npm start
    ```

### Frontend Setup
1. Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```

2. Run the frontend:
    ```bash
    npm start
    ```

### Running Tests
- Frontend:
  ```bash
  npm test
