import { db } from "@/app";
import type { CreateTaskData, Task, UpdateTaskData } from "@/entities/tasks";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";

// --- Получение задач ---
export const getTasks = async (userId: string): Promise<Task[]> => {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  const tasks: Task[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Task));
  return tasks;
};

// --- Создание задачи ---
export const addTask = async (taskData: CreateTaskData & { userId: string }): Promise<Task> => {
  const docRef = await addDoc(collection(db, "tasks"), {
    ...taskData,
    completed: taskData.completed || false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return { id: docRef.id, ...taskData, completed: taskData.completed || false, createdAt: new Date(), updatedAt: new Date() } as Task;
};

// --- Обновление задачи ---
export const editTask = async (id: string, changes: UpdateTaskData): Promise<{ id: string; changes: UpdateTaskData }> => {
  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, { ...changes, updatedAt: serverTimestamp() });
  return { id, changes };
};

// --- Удаление задачи ---
export const removeTask = async (id: string): Promise<string> => {
  const taskRef = doc(db, "tasks", id);
  await deleteDoc(taskRef);
  return id;
};
