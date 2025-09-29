import { describe, it, expect } from "vitest";
import { mapFirebaseError } from "../lib";

describe("mapFirebaseError", () => {
  it("возвращает пустую строку если ошибки нет", () => {
    expect(mapFirebaseError("")).toBe("");
  });

  it("распознаёт invalid-credential", () => {
    expect(mapFirebaseError("auth/invalid-credential")).toBe("Неверный email или пароль");
  });

  it("распознаёт email-already-in-use", () => {
    expect(mapFirebaseError("auth/email-already-in-use")).toBe("Этот email уже зарегистрирован");
  });

  it("распознаёт weak-password", () => {
    expect(mapFirebaseError("auth/weak-password")).toBe("Пароль должен содержать минимум 6 символов");
  });

  it("распознаёт user-not-found", () => {
    expect(mapFirebaseError("auth/user-not-found")).toBe("Пользователь с таким email не найден");
  });

  it("распознаёт wrong-password", () => {
    expect(mapFirebaseError("auth/wrong-password")).toBe("Неверный пароль");
  });

  it("возвращает дефолтное сообщение для неизвестной ошибки", () => {
    expect(mapFirebaseError("какая-то-другая-ошибка")).toBe("Произошла ошибка, попробуйте ещё раз");
  });
});
