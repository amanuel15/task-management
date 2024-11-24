import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/state/store";
import { LoginSchema, loginSchema } from "../authSchema";
import FormField from "@/components/formField";

export default function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Card className="mx-auto min-w-96 max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(() => {
            localStorage.setItem("authToken", "test");
            login();
            navigate("/", { replace: true });
          })}
          className="space-y-4"
        >
          <div className="space-y-4">
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              register={register}
              errors={errors}
            />

            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              register={register}
              errors={errors}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <NavLink className={"text-primary text-sm m-auto"} to="/register">
          Create an account?
        </NavLink>
      </CardFooter>
    </Card>
  );
}
