import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUserAPI = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const messageInfo = errorData.message.message;
    throw new Error(messageInfo || "Login failed");
  }
  const data = await response.json();
  return {token: data.access_token, user: data.user}; // API returns a JWT token
};

//Create async thunk for login (uses REST API)
export const loginUser = createAsyncThunk("auth/login", async ({ email, password }: { email: string; password: string }) => {
    const data = await loginUserAPI(email, password);
    return data;
  });