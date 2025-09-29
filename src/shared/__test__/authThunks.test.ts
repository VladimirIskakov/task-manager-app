import { describe, it, expect, vi } from "vitest";
import { loginUser, registerUser, logoutUser } from "@/entities/auth/thunks";
import { authService } from "@/shared/api/auth";
import type { User } from "firebase/auth";

// Функция для создания мок-объекта User
const makeMockUser = (overrides: Partial<User> = {}): User =>
  ({
    uid: "mock-uid",
    email: "mock@test.com",
    displayName: "Mock User",
    emailVerified: false,
    isAnonymous: false,
    metadata: {} as any,
    providerData: [],
    refreshToken: "mock-token",
    tenantId: null,
    delete: vi.fn(),
    getIdToken: vi.fn(),
    getIdTokenResult: vi.fn(),
    reload: vi.fn(),
    toJSON: vi.fn(),
    ...overrides,
  } as unknown as User);

describe("auth thunks", () => {
  it("loginUser возвращает пользователя", async () => {
    vi.spyOn(authService, "login").mockResolvedValue(
      makeMockUser({ uid: "1", email: "test@test.com", displayName: "Test" })
    );

    const result = await loginUser({ email: "test@test.com", password: "123456" })(
      vi.fn(),
      vi.fn(),
      {} as any
    );

    expect(result.payload).toEqual({
      uid: "1",
      email: "test@test.com",
      displayName: "Test",
    });
  });

  it("registerUser возвращает пользователя", async () => {
    vi.spyOn(authService, "register").mockResolvedValue(
      makeMockUser({ uid: "2", email: "new@test.com", displayName: "New User" })
    );

    const result = await registerUser({
      email: "new@test.com",
      password: "123456",
      displayName: "New User",
    })(vi.fn(), vi.fn(), {} as any);

    expect(result.payload).toEqual({
      uid: "2",
      email: "new@test.com",
      displayName: "New User",
    });
  });

  it("logoutUser вызывает logout", async () => {
    const logoutSpy = vi.spyOn(authService, "logout").mockResolvedValue();

    await logoutUser()(vi.fn(), vi.fn(), {} as any);
    expect(logoutSpy).toHaveBeenCalled();
  });
});
