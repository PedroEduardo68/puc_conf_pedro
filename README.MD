

# Project Name

## Overview
This project is a web application that leverages JavaScript, Docker Compose, MongoDB, and Mongo Express. It features a full-stack architecture with both a backend and a frontend, allowing for seamless integration and interaction between various components.

TCC To PUCRS of the Pedro Camera

## Features

Backend: Node.js/Express server providing RESTful API endpoints.
Frontend: Modern web interface built with JavaScript frameworks/libraries (React).
Database: MongoDB for data storage.
Database Management: Mongo Express for easy database management via a web interface.
Containerization: Docker Compose for managing multi-container Docker applications.


## Prerequisites
Docker
Docker Compose

## Environment Variables
Create a .env file in the root directory and set the necessary environment variables:



## Architecture

```plaintext
├── backend
|   ├──app
|   │   ├── Dockerfile
|   │   ├── src
|   │   │   ├── controllers
|   │   │   ├── models
|   │   │   ├── routes
|   │   │   └── index.js
├── frontend
│   ├── confsysappweb
|   │   ├── Dockerfile
|   │   ├── public
|   │   ├── src
|   │   │   ├── components
|   │   │   ├── pages
|   │   │   └── index.js
│   ├── confsysappweb-demo
|   │   ├── Dockerfile
|   │   ├── public
|   │   ├── src
|   │   │   ├── components
|   │   │   ├── pages
|   │   │   └── index.js
├── docker-compose.yml
├── README.md
└── package.json
```

## Getting Started

Clone the Repository

```bash
git clone https://github.com/PedroEduardo68/puc_conf_pedro.git
cd puc_conf_pedro
```

Environment Variables
Create a .env file in the root directory and set the necessary environment variables:

```bash
MONGO_INITDB_ROOT_USERNAME=yourUsername
MONGO_INITDB_ROOT_PASSWORD=yourPassword
MONGO_EXPRESS_PORT=8081
```

Build and Run with Docker Compose


```bash
docker-compose up --build
```

This command will:

Build and start the backend and frontend services.
Set up the MongoDB database.
Launch Mongo Express for database management.


## Accessing the Application

Frontend: http://localhost:3000
Backend: http://localhost:5000/api
Mongo Express: http://localhost:8081


## Desenvolvimento


###  Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

### Frontend

Navigate to the frontend directory:

```bash
cd frontend/confsysappweb
```


Install dependencies and start the development server:

```bash
npm install
npm run dev
```



## License
This project is licensed under the MIT License. See the LICENSE file for details.