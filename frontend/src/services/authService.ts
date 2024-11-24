import apiClient from "./apiClient";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await apiClient.post("/login", {
      email,
      password,
    });

    // Assume the API returns a token
    const token = response.data.token;

    // Store the token (in localStorage or cookies)
    localStorage.setItem("authToken", token);

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function register({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) {
  try {
    const response = await apiClient.post("/register", {
      email,
      name,
      password,
    });

    return response.data; // return data to inform the component about the result
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}
