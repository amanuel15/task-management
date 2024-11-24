import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";

import "./App.css";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Register from "@/pages/Register";
import AuthLayout from "@/features/auth/layouts/AuthLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container m-auto">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route
            index
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* <Route path="tasks/:id" element={<Project />} /> */}
          </Route>
        </Routes>
      </main>
    </QueryClientProvider>
  );
}

export default App;
