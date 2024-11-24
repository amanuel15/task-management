import useAuthStore from "../state/store";
import { Button } from "../components/ui/button";
import TaskTable from "../features/tasks/components/TaskTable";

export default function Dashboard() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div>
      <div className="py-4 flex flex-row justify-between border-b mb-4">
        <h2 className="text-2xl font-bold">Task Management</h2>
        <Button
          onClick={() => {
            localStorage.removeItem("authToken");
            logout();
          }}
          variant={"outline"}
        >
          Logout
        </Button>
      </div>
      <TaskTable />
    </div>
  );
}
