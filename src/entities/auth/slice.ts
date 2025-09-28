import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/store";
import type { AppUser, AuthState } from "./types";
import { mapFirebaseError } from "@/shared/lib";
import { loginUser, registerUser, logoutUser } from "./thunks";

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser>) => {
      // Устанавливает текущего пользователя
      state.user = action.payload;
    },
    logout: (state) => {
      // Очищает пользователя при выходе
      state.user = null;
    },
    clearError: (state) => {
      // Сбрасывает сообщение об ошибке
      state.error = null;
    },
    loadingStart: (state) => {
      // Устанавливает состояние загрузки в true
      state.loading = true;
    },
    loadingEnd: (state) => {
      // Завершает состояние загрузки
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = mapFirebaseError(action.payload as string);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = mapFirebaseError(action.payload as string);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout, clearError, loadingStart, loadingEnd } = authSlice.actions;

export default authSlice.reducer;
