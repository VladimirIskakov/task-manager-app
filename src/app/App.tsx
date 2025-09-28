import { HomePage, TasksPage } from "@/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "@/shared/lib";

export const App = () => {
  useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
