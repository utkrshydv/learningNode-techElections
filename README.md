
# Voting App Project

## Project Overview

This project is a voting application backend built using **Node.js**, **Express**, and **MongoDB** with **Mongoose** for object modeling. The application supports two types of users: `voter` and `admin`. Voters can sign up, log in, and cast a vote for a candidate. Admins have privileges to manage candidates—adding, updating, and deleting them. The system uses **JSON Web Tokens (JWT)** for secure authentication and authorization.

## File Structure

```

.
├── server.js               # Main entry point for the backend server
├── db.js                   # MongoDB connection configuration
├── jwt.js                  # JWT utility for authentication
├── models/
│   ├── candidate.js        # Mongoose schema for candidates
│   └── user.js             # Mongoose schema for users
├── routes/
│   ├── candidateRoutes.js  # Routes for candidate operations and voting
│   └── userRoutes.js       # Routes for user authentication and profile
├── .gitignore
├── package.json
├── package-lock.json
└── planning.txt            # Miscellaneous project planning notes

```

## Features

- User authentication and role-based access (voter/admin)
- Secure password hashing with bcrypt
- Voting logic that prevents double voting
- Candidate schema includes vote count and individual vote logs
- Admin routes protected for candidate management

## Environment Variables

The following environment variable is required:

```

```

## Learning Outcomes

This project served as a practical introduction to backend development with Node.js and Express. Key areas explored:

- **Building RESTful APIs**: Designed and implemented routes for user management and candidate voting using Express.
- **Authentication with JWT**: Secured routes with middleware and token-based authentication mechanisms.
- **Data Modeling with Mongoose**: Structured schemas with validations and relationships between users and candidates.
- **Password Security**: Implemented password hashing and secure storage using bcrypt.
- **Role-Based Access Control**: Handled different user privileges and access levels cleanly.

This project strengthened foundational skills in backend architecture, database integration, and secure user authentication.
```

---

