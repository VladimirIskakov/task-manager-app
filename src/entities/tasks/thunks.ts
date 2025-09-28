import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateTaskData, UpdateTaskData } from "./types";
import { addTask, editTask, getTasks, removeTask } from "@/shared/api/auth";

// Получение задач
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (userId: string) => {
  return await getTasks(userId);
});

// Создание задачи
export const createTask = createAsyncThunk("tasks/createTask", async (taskData: CreateTaskData & { userId: string }) => {
  return await addTask(taskData);
});

// Обновление задачи
export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, changes }: { id: string; changes: UpdateTaskData }) => {
  return await editTask(id, changes);
});

// Удаление задачи
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: string) => {
  return await removeTask(id);
});
