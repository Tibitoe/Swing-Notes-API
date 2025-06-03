# Swing Notes API

## Description

The Swing Notes API is a RESTful API built with Node.js, Express, and PostgreSQL. It provides a backend for managing user accounts and personal notes, with features including:

- User registration and authentication
- Secure password storage using bcrypt
- JWT-based authentication
- Creation, retrieval, updating, and deletion of notes
- User-specific note access
- Input validation using Zod
- API documentation with Swagger

## Technologies Used

- Node.js
- Express
- PostgreSQL
- bcrypt
- jsonwebtoken (JWT)
- Zod
- Swagger
- js-yaml
- dotenv
- cors

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone [repository URL]
    cd Swing-Notes-API
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**

    - Create a `.env` file in the root directory.
    - Add the following environment variables, replacing the values with your actual configuration:

    ```
    PORT=3000
    POSTGRES_URL=[your URL]
    JWT_SECRET=[your secret key]
    ```

4.  **Set up the database:**

    - Ensure you have PostgreSQL installed and running.
    - Create a database with the name specified in your `DATABASE_URL`.
    - Run the following command to create the necessary tables:

    ```bash
    npm run create-tables
    ```

5.  **Start the server:**

    ```bash
    npm run dev
    ```

    The server will start running on the port specified in your `.env` file (default: 3000).

## API Endpoints

### Authentication

- `POST /auth/register`: Register a new user.

  - Request body:

  ```json
  {
    "username": "your_username",
    "email": "your_email@example.com",
    "password": "your_password"
  }
  ```

  - Response:

  ```json
  {
    "token": "JWT token",
    "username": "your_username",
    "email": "your_email@example.com",
    "profileId": 123
  }
  ```

- `POST /auth/login`: Login an existing user.

  - Request body:

  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

  - Response:

  ```json
  {
    "token": "JWT token",
    "username": "your_username",
    "email": "your_email@example.com",
    "profileId": 123
  }
  ```

### Notes

- `GET /api/notes`: Get all notes for the authenticated user.
  - Requires a valid JWT token in the `Authorization` header.
- `GET /api/notes/{id}`: Get a specific note by ID.
  - Requires a valid JWT token in the `Authorization` header.
- `POST /api/notes`: Create a new note.

  - Requires a valid JWT token in the `Authorization` header.
  - Request body:

  ```json
  {
    "title": "Your note title",
    "text": "Your note text"
  }
  ```

- `PUT /api/notes/{id}`: Update an existing note.

  - Requires a valid JWT token in the `Authorization` header.
  - Request body:

  ```json
  {
    "title": "Updated note title",
    "text": "Updated note text"
  }
  ```

- `DELETE /api/notes/{id}`: Delete a note.
  - Requires a valid JWT token in the `Authorization` header.
- `GET /api/notes/search?term={search_term}`: Search notes by term.
  - Requires a valid JWT token in the `Authorization` header.

## API Documentation

API documentation is available through Swagger UI. To access it, navigate to `http://localhost:[port]/docs` in your browser.
