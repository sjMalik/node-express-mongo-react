# Web Application from Scratch - Node-Express-Mongo-React

## Prerequisite
```
Node Version v18.17.0
MongoDb Version 5 or above
```

## Check Node and Mongo Version
```
node -v
mongo --version
```

## Steps to run the server
Step 1: Open Terminal and Change Directory to Server
```
cd server
```

Step 2: Install all node dependencies
```
npm i
```

Step 3: Run the server
```
npm start
```

## API Documentation URL
http://localhost:3001/api-docs

## Project Structure
```
NODE-EXPRESS-MONGO-REACT/
├── client/
|   ├──...                                  // Client-side code (e.g., React components, styles, etc.)
├── server/
|   ├── index.js                            // Entry point for the server
|   ├── controllers/                        // Controllers handle the business logic of the application
|   |   ├── auth.controllers.js             // Controller for authentication-related logic
|   |   ├── author.controllers.js           // Controller for author-related logic
|   |   ├── book.controllers.js                   // Model definition for books
|   |   └── ...                             // Other controller files
|   ├── middlewares/                        // Middlewares for request processing (e.g., authentication, validation)
|   |   ├── authentication.middleware.js    // Middleware for authentication checks
|   |   ├── validation.middleware.js        // Middleware for input validation
|   |   ├── index.js                        // Main file to import and export all middlewares
|   |   └── ...                             // Other middleware files
|   ├── models/                             // Database models (e.g., Mongoose models for MongoDB)
|   |   ├── author.model.js                 // Model definition for authors
|   |   ├── book.model.js                   // Model definition for books
|   |   ├── user.model.js                   // Model definition for users
|   |   ├── index.js                        // Main file to import and export all models
|   |   └── ...                             // Other model files
|   ├── routes/                             // API routes for different entities
|   |   ├── auth.routes.js                  // Routes for authentication
|   |   ├── author.routes.js                // Routes for authors
|   |   ├── book.routes.js                  // Routes for books
|   |   ├── index.js                        // Main file to import and export all routes
|   |   └── ...                             // Other route files
|   ├── test/                               // Test files (e.g., unit tests, integration tests)
|   |   ├── auth.test.js                    // Tests for authentication functionality
|   |   ├── author.test.js                  // Tests for author-related functionality
|   |   ├── book.test.js                    // Tests for book-related functionality
|   |   └── ...                             // Other test files
|   ├── .env                                // Environment variables configuration
|   ├── .gitignore                          // Specifies intentionally untracked files to ignore in Git
|   ├── nodemon.json                        // Configuration file for nodemon (Node.js utility for auto-restarting the server)
|   ├── package.json                        // Configuration file for Node.js project and dependencies
|   ├── package-lock.json                   // Auto-generated file for package.json dependencies
|   ├── swagger.yaml                        // Swagger/OpenAPI documentation for the API
|   ├── README.md                           // Project documentation
└── ...                                     // Other files or directories as needed
```