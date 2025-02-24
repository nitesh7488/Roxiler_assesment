# Roxiler Systems Assignment

## Project Overview
This project is a full-stack application built for Roxiler Systems assignment. It includes:
- Backend API built with Node.js and Express
- Frontend built with React.js
- MongoDB for database storage

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/nitesh7488/Roxiler_assesment.git
   ```
2. Install backend dependencies:
   ```bash
   cd Roxiler-Systems-Assignment-main/backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.gfghy.mongodb.net/transactionsDB?retryWrites=true&w=majority
   PORT=3000
   ```

### Running the Application
1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
2. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

## API Documentation

### Transactions API
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions/:id` - Get a specific transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

## MongoDB Connection
The application uses MongoDB Atlas for database storage. The connection string is configured in the `.env` file.

## Contribution Guidelines
1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License
This project is licensed under the MIT License.
