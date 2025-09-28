import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TasksState } from "./types";
import type { RootState } from "@/app/store/store";
import { fetchTasks, createTask, updateTask, deleteTask } from './thunks';

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
  filter: "all",
  searchQuery: "",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<"all" | "active" | "completed">) => {
      // Устанавливает фильтр задач (все, активные, завершённые)
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      // Устанавливает строку поиска для фильтрации задач
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      // Сбрасывает сообщение об ошибке
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Обновляет список задач
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload); // Добавляет новую задачу в начало списка
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create task";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        // Обновляет задачу по id
        const { id, changes } = action.payload;
        const index = state.items.findIndex((t) => t.id === id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...changes,
            updatedAt: new Date(),
          };
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setFilter, setSearchQuery, clearError } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;
