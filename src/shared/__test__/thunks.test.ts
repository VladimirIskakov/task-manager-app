import { describe, it, expect, vi } from "vitest";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/entities/tasks/thunks";
import * as api from "@/shared/api/auth";
import type { Task } from "@/entities/tasks";

const makeMockTask = (overrides: Partial<Task> = {}): Task => ({
  id: "default-id",
  title: "Default title",
  description: "Default description",
  completed: false,
  priority: "low",
  order: 0,
  userId: "user1",
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

describe("task thunks", () => {
  it("fetchTasks возвращает задачи", async () => {
    vi.spyOn(api, "getTasks").mockResolvedValue([makeMockTask({ id: "1", title: "Task" })]);

    const result = await fetchTasks("user1")(vi.fn(), vi.fn(), {} as any);
    expect(result.payload).toEqual([expect.objectContaining({ id: "1", title: "Task" })]);
  });

  it("createTask возвращает созданную задачу", async () => {
    vi.spyOn(api, "addTask").mockResolvedValue(makeMockTask({ id: "2", title: "New Task" }));

    const result = await createTask({ userId: "user1", title: "New Task" } as any)(
      vi.fn(),
      vi.fn(),
      {} as any
    );
    expect(result.payload).toEqual(expect.objectContaining({ id: "2", title: "New Task" }));
  });

  it("updateTask возвращает изменения", async () => {
    vi.spyOn(api, "editTask").mockResolvedValue({
      id: "3",
      changes: { title: "Updated" },
    });

    const result = await updateTask({ id: "3", changes: { title: "Updated" } })(
      vi.fn(),
      vi.fn(),
      {} as any
    );
    expect(result.payload).toEqual({ id: "3", changes: { title: "Updated" } });
  });

  it("deleteTask возвращает id удаленной задачи", async () => {
    vi.spyOn(api, "removeTask").mockResolvedValue("4");

    const result = await deleteTask("4")(vi.fn(), vi.fn(), {} as any);
    expect(result.payload).toBe("4");
  });
});
