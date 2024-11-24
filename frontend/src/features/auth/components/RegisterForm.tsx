import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { registerSchema, RegisterSchema } from "../authSchema";
import FormField from "@/components/formField";
import { register as registerUser } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { isLoading, mutate } = useMutation(registerUser, {
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description:
          ((error as AxiosError)?.response?.data as { msg: string })?.msg ??
          "Wrong email or password",
      });
    },
    onSuccess: () => {
      toast({
        title: "Registration Success",
        description: "Login to continue",
      });
      navigate("/login");
    },
  });

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
          onSubmit={handleSubmit((data) => {
            mutate(data);
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
              {isLoading && <Loader2 className="animate-spin" />}
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
