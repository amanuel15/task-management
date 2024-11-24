import {
  CreateTaskSchema,
  UpdateTaskSchema,
} from "@/features/tasks/taskSchema";
import apiClient from "./apiClient";

export async function createTask(task: CreateTaskSchema) {
  try {
    const response = await apiClient.post("/api/tasks", task);

    // Assume the API returns a token
    const token = response.data.token;

    // Store the token (in localStorage or cookies)
    localStorage.setItem("authToken", token);

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Create task error:", error);
    throw error;
  }
}

export async function updateTask(taskId: string, task: UpdateTaskSchema) {
  try {
    const response = await apiClient.patch(`/api/tasks/${taskId}`, task);

    // Assume the API returns a token
    const token = response.data.token;

    // Store the token (in localStorage or cookies)
    localStorage.setItem("authToken", token);

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Update task error:", error);
    throw error;
  }
}
export async function getTasks() {
  try {
    const response = await apiClient.get("/api/tasks");

    // Assume the API returns a token
    const token = response.data.token;

    // Store the token (in localStorage or cookies)
    localStorage.setItem("authToken", token);

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Get tasks error:", error);
    throw error;
  }
}

export async function getTask(taskId: string) {
  try {
    const response = await apiClient.get(`/api/tasks/${taskId}`);

    // Assume the API returns a token
    const token = response.data.token;

    // Store the token (in localStorage or cookies)
    localStorage.setItem("authToken", token);

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Get task error:", error);
    throw error;
  }
}
