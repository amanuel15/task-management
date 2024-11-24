import useAuthStore from "@/state/store";
import { Button } from "@/components/ui/button";
import TaskTable from "@/features/tasks/components/TaskTable";

export default function Dashboard() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div>
      Dashboard
      <Button
        onClick={() => {
          localStorage.removeItem("authToken");
          logout();
        }}
      >
        Logout
      </Button>
      <TaskTable />
    </div>
  );
}
