import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { registerSchema, RegisterSchema } from "../authSchema";
import FormField from "@/components/formField";

export default function RegisterForm() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <Card className="mx-auto min-w-96 max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription>
          Enter your details to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(() => {
            login();
            navigate("/", { replace: true });
          })}
          className="space-y-4"
        >
          <div className="space-y-4">
            <FormField
              label="Username"
              name="name"
              type="text"
              placeholder="Enter your name"
              register={register}
              errors={errors}
            />

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
              placeholder="Enter a password"
              register={register}
              errors={errors}
            />
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <NavLink className={"text-primary text-sm m-auto"} to="/login">
          I have an account?
        </NavLink>
      </CardFooter>
    </Card>
  );
}
