import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-svh flex items-center justify-center">
      {/* Render nested routes (Login or Register) */}
      <Outlet />
    </div>
  );
}
