import { Button } from "@/components/ui/button";
import useAuthStore from "@/state/store";
import { useNavigate } from "react-router";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  return (
    <div>
      Login Page
      <Button
        onClick={() => {
          console.log("clicked");
          login({ email: "test", name: "test" });
          navigate("/", { replace: true });
        }}
      >
        Submit
      </Button>
    </div>
  );
}
