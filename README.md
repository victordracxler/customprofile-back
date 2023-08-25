
# CustomProfile Back-end API

This repository contains the back-end API for a custom user profile system. The API allows you to manage user profiles by providing endpoints for creating, retrieving, updating, and deleting user profiles.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16.17.0)
- [npm](https://www.npmjs.com/) (version 8.19.2)
- [PostgreSQL] (running instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/victordracxler/customprofile-back.git
   ```

2. Navigate to the project directory:

   ```bash
   cd customprofile-back
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Running the Server

To start the API server, run:

```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

### API Documentation

#### Authentication Endpoints

##### Sign Up

Endpoint: `POST /sign-up`

Description: This endpoint allows users to create an account by providing their registration details.

Example Request:

```json
{
  "name": "user",
  "email": "new_user",
  "password": "secure_password"
}
```

##### Sign In

Endpoint: `POST /sign-in`

Description: This endpoint allows users to authenticate and sign in by providing their username and password.

Example Request:

```json
{
  "email": "existing_user",
  "password": "secure_password"
}
```

#### User Information Endpoints

##### Get User Info

Endpoint: `GET /user-info/:userId`

Description: This endpoint retrieves information about a specific user by providing their `userId`.

##### Update User Info

Endpoint: `POST /user-info/:userId`

Description: This endpoint allows users to update their information by providing new details.


## Environment Variables

Create a `.env` file in the root directory based on the `.env.example` template. Set the appropriate values for the environment variables, including PostgreSQL connection details and any other required configurations.

## Contributing

Contributions are welcome! If you encounter issues or have suggestions, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
