# Delivery App

A full-stack beverage delivery app project that was developed as a group effort. The main goal of the project was to practice creating and integrating both the back-end and front-end functionalities, which included authentication, login routes, user management, product handling, sales processing, and the respective CRUD operations.

The frontend was built using React, while the backend was developed with Express. For the database, MySQL was utilized, and Sequelize was chosen as the ORM for managing the data.

## Table of Contents

* [Technologies Used](#technologies-used)
* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation and Running in Development Environment](#installation-and-running-in-development-environment)
* [Tests](#tests)
* [API Endpoints](#api-endpoints)
* [Authentication](#authentication)
* [Acknowledgments](#acknowledgments)

## Technologies Used
- Frontend: React
- Backend: Express
- Database: MySQL
- ORM: Sequelize
- Containerization: Docker, Docker Compose

## Features
- User registration and authentication
- Product browsing and searching
- Adding products to the cart
- Placing and processing orders
- Admin dashboard for managing users
- Seller dashboard for managing sales

## Prerequisites

Before running the project, make sure you have Docker and Docker Compose installed on your system. If you don't have them installed, follow the instructions below:

- Install Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- Install Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## Installation and Running in Development Environment

1. Clone the repository:
    ```bash
    git clone https://github.com/tormelo/delivery-app.git
    ```
2. Navigate to the project folder:
    ```bash
    cd delivery-app
    ```
3. Start the db, server and front-end containers using Docker Compose:
    ```bash
    docker-compose up
    ```
4. The API will be accessible at `http://localhost:3001` and the app at `http://localhost:3000`.

## Tests

Run the tests using one of the following commands in the root directory:
- Run tests without coverage:
  ```bash
  npm run test:back
  ```
  or
  ```bash
  npm run test:front
  ```
- Run tests with coverage:
  ```bash
  npm run test:back:coverage
  ```
  or
  ```bash
  npm run test:front:coverage
  ```

The test results and coverage report will be displayed in the terminal.

## API Endpoints

### Login
- **POST /login**: User authentication endpoint. Obtain an authentication token by submitting credentials.

### Users
- **GET /users**: Retrieve a list of all registered users with basic information.
- **GET /users/sellers**: Retrieve a filtered list of users identified as sellers.
- **POST /users/admin/register**: Administrator registers new users by providing necessary details.
- **POST /users/register**: User self-registration with required information.
- **DELETE /users/:id**: Administratively delete a user account by ID.

### Products
- **GET /products**: Retrieve a list of available products with basic information.

### Sales
- **GET /sales**: Retrieve a list of all sales transactions with key details.
- **GET /sales/:id**: Get specific details about a sale using its unique identifier.
- **POST /sales**: Create new sales transactions by providing relevant information.
- **PATCH /sales/:id**: Update specific details of a sale using its unique identifier.

## Authentication

The API implements authentication to secure certain routes. Users are required to register and log in to access protected endpoints.

## Acknowledgments

This project was developed during the web development course at Trybe. Special thanks to all the team members and course instructors who contributed to the learning process throughout the project's development.