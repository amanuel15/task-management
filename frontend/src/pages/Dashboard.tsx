import { Button } from "@/components/ui/button";
import useAuthStore from "@/state/store";

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
    </div>
  );
}
