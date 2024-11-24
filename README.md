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
