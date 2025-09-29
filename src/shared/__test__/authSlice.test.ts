import { describe, it, expect } from "vitest";
import reducer, { setUser, clearError } from "@/entities/auth/slice";
import type { AuthState, AppUser } from "@/entities/auth/";

describe("authSlice reducer", () => {
  const initial: AuthState = { user: null, loading: true, error: null };

  it("setUser должен установить пользователя", () => {
    const user: AppUser = { uid: "1", email: "test@mail.com", displayName: "Test" };
    const state = reducer(initial, setUser(user));
    expect(state.user).toEqual(user);
  });

  it("clearError должен очищать ошибку", () => {
    const stateWithError: AuthState = { ...initial, error: "Ошибка" };
    const state = reducer(stateWithError, clearError());
    expect(state.error).toBeNull();
  });
});
