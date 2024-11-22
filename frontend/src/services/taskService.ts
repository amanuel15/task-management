import {
  CreateTaskSchema,
  UpdateTaskSchema,
} from "../features/tasks/taskSchema";
import apiClient from "./apiClient";
import { Task } from "../types/task";

export async function createTask(task: CreateTaskSchema) {
  try {
    const response = await apiClient.post("/api/tasks", task);

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Create task error:", error);
    throw error;
  }
}

export async function updateTask({
  taskId,
  task,
}: {
  taskId: string;
  task: UpdateTaskSchema;
}) {
  try {
    const response = await apiClient.put(`/api/tasks/${taskId}`, task);

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Update task error:", error);
    throw error;
  }
}

export async function deleteTask(taskId: string) {
  try {
    const response = await apiClient.delete(`/api/tasks/${taskId}`);

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Delete task error:", error);
    throw error;
  }
}

export async function getTasks(): Promise<{ msg: string; data: Task[] }> {
  try {
    const response = await apiClient.get("/api/tasks");

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Get tasks error:", error);
    throw error;
  }
}

export async function getTask(
  taskId: string
): Promise<{ msg: string; data: Task }> {
  try {
    const response = await apiClient.get(`/api/tasks/${taskId}`);

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Get task error:", error);
    throw error;
  }
}
