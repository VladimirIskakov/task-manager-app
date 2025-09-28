import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppUser, LoginData, RegisterData } from "./types";
import { authService } from "@/shared/api/auth";

// Асинхронный thunk для входа пользователя
export const loginUser = createAsyncThunk<AppUser, LoginData>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await authService.login(email, password);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Асинхронный thunk для регистрации пользователя
export const registerUser = createAsyncThunk<AppUser, RegisterData>(
  "auth/register",
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const user = await authService.register(email, password, displayName);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Асинхронный thunk для выхода пользователя
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});
