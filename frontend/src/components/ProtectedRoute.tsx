import { ReactNode } from "react";
import { Navigate } from "react-router";

import useAuthStore from "@/state/store";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the child component (Dashboard)
  return children;
}
