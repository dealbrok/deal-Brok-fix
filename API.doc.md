# API Documentasi DEAL-BROK Application

This document provides the details of the API endpoints for user authentication, game management, and character management.

## Authentication

### POST `/login`

- **Request Body:**

  - `username` (string, required): User's email.
  - `password` (string, required): User's password.

- **Response:**

  - Status: `200 OK`
  - Body:

    ```json
    {
      "access_token": "string"
    }
    ```

  - Status: `400 - Bad Request`
  - Body:

    ````json
    {
    "message": "Email is required"
    }
    OR
    {
    "message": "Password is required"
    }
    ...

    - Status: `400 - Bad Request`
    - Body:

    ```json
    {
    "message": "Please insert your username or password (400)"
    }
    ```

### Post `/register`

Register a new user.

- **Request Body:**

  - `username` (string, required)
  - `password` (string, required)

- **Response:**
  - Status: `201 Created`
  - Body:
    ```json
    {
      "data": {
        "id": "number",
        "username": "string",
        "password": "string"
      }
    }
    ```

## room Management

### Get `/room`

Retrieve a list of all All Room.

- **Response:**
  - Status: `200 OK`
  - Body:
    ```json
    {
      "message": "Success read Character",
      "Room": [
        {
          "id": "number",
          "name": "string",
          "Token": "string"
        }
      ]
    }
    ```

### Get `/room/:id`

Retrieve a list of all All Room.

- **Response:**
  - Status: `200 OK`
  - Body:
    ```json
    {
      "message": "Success read Character",
      "Room": [
        {
          "id": "number",
          "name": "string",
          "Token": "string"
        }
      ]
    }
    ```

### Post `/room`

Add a new Room. Requires `authorization`.
**Request Body:**

- `name` (string, required)
- `Token` (string, required)

- **Response:**
  - Status: `201 Created`
  - Body:
    ```json
    {
      "Room": {
        "id": "number",
        "name": "string",
        "Token": "string"
      }
    }
    ```


## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

