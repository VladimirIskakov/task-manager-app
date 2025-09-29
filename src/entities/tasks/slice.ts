import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TasksState } from "./types";
import type { RootState } from "@/app/store/store";
import { fetchTasks, createTask, updateTask, deleteTask } from './thunks';

const initialState: TasksState & { loadingIds: string[] } = {
  items: [],
  loading: false,
  loadingIds: [],
  error: null,
  filter: "all",
  searchQuery: "",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<"all" | "active" | "completed">) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTasks.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createTask.pending, (state) => { state.loading = true; })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        // 3. Replace notification.success with message.success
      })
      .addCase(createTask.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateTask.pending, (state, action) => { state.loadingIds.push(action.meta.arg.id); })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, changes } = action.payload;
        const index = state.items.findIndex((t) => t.id === id);
        if (index !== -1) state.items[index] = { ...state.items[index], ...changes, updatedAt: new Date() };
        state.loadingIds = state.loadingIds.filter(taskId => taskId !== action.payload.id);
      })
      .addCase(updateTask.rejected, (state, action) => {
        const id = action.meta.arg.id;
        state.loadingIds = state.loadingIds.filter(taskId => taskId !== id);
      })

      .addCase(deleteTask.pending, (state, action) => { state.loadingIds.push(action.meta.arg); })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter(item => item.id !== id);
        state.loadingIds = state.loadingIds.filter(taskId => taskId !== id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        const id = action.meta.arg;
        state.loadingIds = state.loadingIds.filter(taskId => taskId !== id);
      });
  },
});

export const { setFilter, setSearchQuery, clearError } = taskSlice.actions;
export const selectTasks = (state: RootState) => state.tasks;
export default taskSlice.reducer;