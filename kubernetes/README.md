# Running Locally on Minikube

This guide will help you run the project locally on Minikube using Kubernetes configuration files. It covers building Docker images for the frontend and backend, loading them into Minikube, and accessing the services locally.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://www.docker.com/get-started) (Docker Engine)
- [Minikube](https://minikube.sigs.k8s.io/docs/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

You can check if Minikube, kubectl, and Docker are installed correctly by running the following commands:

```bash
minikube version
```

```bash
kubectl version
```

```bash
docker --version
```

## Running the Application on Minikube

### 1. Start Minikube

First, start a Minikube cluster (if not started) and create a namespace called `task-management`:

```bash
minikube start
```

```bash
kubectl create ns task-management
```

This will start Minikube with the default settings and create a local Kubernetes cluster.

### 2. Build Docker Images for Frontend and Backend

Next, you need to build the Docker images for the frontend and backend services.

#### Build Frontend Image

Navigate to the `frontend` directory and build the Docker image:

```bash
cd frontend
```

```bash
docker build --build-arg VITE_API_URL=http://localhost:1378 -t frontend-image:latest .
```

#### Build Backend Image

Similarly, navigate to the `backend` directory and build the Docker image:

```bash
cd backend
```

```bash
docker build -t backend:latest .
```

### 3. Load Docker Images to Minikube

Minikube runs in a VM and requires Docker images to be loaded into the Minikube VM in order to use them in Kubernetes. Use the `minikube image load` command to load your locally built images into Minikube.

#### Load Frontend Image

```bash
minikube image load frontend:latest
```

#### Load Backend Image

```bash
minikube image load backend-image:latest
```

These commands will upload the built Docker images into the Minikube VM.

### 4. Apply Kubernetes Configuration Files

Now, apply the Kubernetes configuration files to set up your services. There are separate configuration files for the frontend, backend, and database in the `/kubernetes` folder.

#### Apply Database Configuration

First, apply the database configurations:

```bash
kubectl apply -f kubernetes/database
```

This will create the necessary database resources as defined in the Kubernetes configuration.

#### Apply Backend Configuration

Next, apply the backend configuration:

```bash
kubectl apply -f kubernetes/backend
```

This will create the backend deployment, services, and any other resources defined in the configuration.

#### Apply Frontend Configuration

Finally, apply the frontend configuration:

```bash
kubectl apply -f kubernetes/frontend
```

This will create the frontend deployment, services, and other necessary Kubernetes resources.

### 5. Expose Services with Minikube Tunnel

To access the services locally, use `minikube tunnel`. This will expose the services to your localhost:

```bash
minikube tunnel
```

This will create a route from your local machine to the Minikube cluster. You may be prompted to enter your password to allow `minikube tunnel` to create the necessary routes.

Once the tunnel is running, you can access the frontend locally using the exposed IP address and ports [`http://localhost:3000`](http://localhost:3000)

### 6. Verify Services

To verify that the services are running, you can check the status of your pods:

```bash
kubectl get pods
```

You should see all of the pods for the frontend, backend, and database services running. If any pod is not in the `Running` state, use `kubectl logs <pod-name>` to check the logs and troubleshoot any issues.

You can also verify the services:

```bash
kubectl get svc
```

This will list the services and their corresponding external IPs and ports.

### 7. Stopping Minikube

When you're done, you can stop the Minikube cluster:

minikube stop

This will stop the Minikube VM and the Kubernetes cluster.

## Troubleshooting

- **Minikube Tunnel Issues**: If `minikube tunnel` is not working or is stuck, make sure your Minikube VM is running and try restarting it with `minikube start`.
- **Pod Issues**: If your pods are not starting correctly, check the pod logs using `kubectl logs <pod-name>` to identify any issues.
- **Service Not Accessible**: If the service is not accessible via the expected port, ensure that the Kubernetes service configuration is correct and that `minikube tunnel` is running.
