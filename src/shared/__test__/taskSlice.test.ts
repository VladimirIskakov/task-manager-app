import { describe, it, expect } from "vitest";
import reducer, { setFilter, setSearchQuery, clearError } from "@/entities/tasks/slice";
import type { TasksState } from "@/entities/tasks/";

const initialState: TasksState & { loadingIds: string[] } = {
  items: [],
  loading: false,
  loadingIds: [],
  error: null,
  filter: "all",
  searchQuery: "",
};

describe("taskSlice reducers", () => {
  it("setFilter должен менять filter", () => {
    const state = reducer(initialState, setFilter("completed"));
    expect(state.filter).toBe("completed");
  });

  it("setSearchQuery должен менять searchQuery", () => {
    const state = reducer(initialState, setSearchQuery("test"));
    expect(state.searchQuery).toBe("test");
  });

  it("clearError должен очищать error", () => {
    const state = reducer({ ...initialState, error: "Ошибка" }, clearError());
    expect(state.error).toBeNull();
  });
});
