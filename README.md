# Task Management Project

This project uses Docker and Docker Compose to set up and run the application. This README will guide you through the steps to run the project using Docker Compose.

## Prerequisites

Before running the project with Docker Compose, ensure that you have the following installed:

- [Docker](https://www.docker.com/get-started) (Docker Engine)
- [Docker Compose](https://docs.docker.com/compose/install/)

You can check if Docker and Docker Compose are installed correctly by running the following commands in your terminal:

```bash
docker --version
```

```bash
docker-compose --version
```

## Getting Started

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/amanuel15/task-management
cd task-management
```

### 2. Build and Start the Application with Docker Compose

Once you've cloned the repository, you can easily build and run the application using `docker-compose`.

1. **Build the Docker Images**:

   Run the following command to build the images specified in the `docker-compose.yml` file:

   ```bash
   docker-compose build
   ```

This will download the necessary base images, install dependencies, and prepare everything for running the application.

2. **Run the Application**:

   After the build is complete, you can start the application with:

   ```bash
   docker-compose up
   ```

   This will:

   - Start the containers defined in `docker-compose.yml`.
   - Build any necessary images if they haven't been built already.
   - Start the application and any associated services (like databases or caching layers).

   You should see the logs from all the running services in your terminal.

   > **Tip**: If you'd like to run the containers in the background (detached mode), add the `-d` flag:

   ```bash
   docker-compose up -d
   ```

   This will start the containers and run them in the background, allowing you to continue using your terminal.

### 3. Verify the Application is Running

Once the containers are up, you can open your web browser and navigate to the address specified in your `docker-compose.yml` file (usually `localhost` with a port such as [`localhost:3000`](http://localhost:3000)). If everything is set up correctly, you should see the application running.

### 4. Stopping the Application

To stop the running services, hit `Ctrl + C` or `CMD + C` or use the following command:

```bash
docker-compose down
```

This will stop the containers and remove them. The `docker-compose.yml` file ensures that any persistent data is properly handled (e.g., volumes or databases).

## Troubleshooting

- **Port Conflicts**: If a port is already in use, you might need to update the `docker-compose.yml` file to use a different port.
- **Permissions Issues**: Ensure that you have appropriate permissions to access Docker and Docker Compose commands.

If you encounter any issues, check the logs using `docker-compose logs` to help diagnose the problem.

<br />
<br />

# Running Tests for the Backend

This guide will help you run the backend tests using Jest. It requires Docker Compose to first start the database container and then run the tests for the backend.

## Prerequisites

Before running the tests, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) (Docker Engine)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/) (For running backend tests)

You can check if Docker and Docker Compose are installed correctly by running the following commands:

```bash
docker --version
```

```bash
docker-compose --version
```

## Running Tests

### 1. Start the Database Container

Before running the backend tests, you need to start the database container using Docker Compose. To do this, run the following command in the root project directory:

```bash
docker-compose up db -d
```

This command will:

- Start only the `db` service (the database container) defined in the `docker-compose.yml` file.
- Run the database container in detached mode (`-d`), meaning it will run in the background.

Ensure that the database container is running properly before proceeding.

### 2. Navigate to the Backend Directory

Once the database is up, navigate to the `/backend` directory where the tests are located:

```bash
cd backend
```

### 3. Run the Jest Tests

Now, you're ready to run the backend tests using Jest. Run the following command:

```bash
npm run test
```

This command will:

- Run the Jest test suite for the backend.
- Display the test results in the terminal.

### 4. Verifying the Tests

After running `npm run test`, you should see the results of your Jest tests in the terminal. It will display whether the tests have passed or failed, along with any relevant information for debugging.

### 5. Stopping the Database Container

Once the tests are complete, you can stop the database container by running:

```bash
docker-compose down
```

This will stop and remove the container that was used for testing.

## Troubleshooting

- **Database Connection Issues**: If the backend tests cannot connect to the database, ensure that the database container is running and the backend is correctly configured to connect to it (e.g., correct environment variables or configuration files).
- **Permissions Issues**: Ensure that you have the necessary permissions to run Docker and Docker Compose commands.
- **Jest Errors**: If the tests fail, check the error message for details. You can also try running the tests with additional logging or debugging flags to gather more information.

### Kubernetes

Read about how to deploy it on a local minikube cluster [here](./kubernetes/README.md)
