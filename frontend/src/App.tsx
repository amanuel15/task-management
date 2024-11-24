import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route, Routes } from "react-router";

import "./App.css";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Register from "@/pages/Register";
import AuthLayout from "@/features/auth/layouts/AuthLayout";
import useAuthStore from "@/state/store";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsLoggedIn = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn();
    }
    setIsLoading(false);
  }, [setIsLoggedIn]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container m-auto">
        <Routes>
          <Route
            element={isAuthenticated ? <Navigate to="/" /> : <AuthLayout />}
          >
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
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
