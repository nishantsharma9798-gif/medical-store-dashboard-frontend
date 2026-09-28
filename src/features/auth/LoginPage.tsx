import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { login } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./AuthLayout";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormValues = z.infer<typeof schema>;

// Shows the *real* reason login failed instead of a generic message —
// makes it obvious whether it's wrong credentials, a dead backend, or CORS/URL misconfig.
function getLoginErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      return "Could not reach the server. Check that the backend is running and VITE_API_URL in your .env is correct, then restart 'npm run dev'.";
    }
    if (error.response.status === 401) {
      return "Incorrect email or password. Try again.";
    }
    return `Server error (${error.response.status}): ${
      error.response.data?.detail ?? "something went wrong."
    }`;
  }
  return "Something went wrong. Please try again.";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
      navigate(data.user.role === "super_admin" ? "/super-admin/clients" : "/dashboard");
    },
  });

  return (
    <AuthLayout
      title="Login"
      subtitle="Sign in to manage your store"
      welcomeTitle="Welcome to MedStock"
      welcomeCopy="Pick up right where you left off. Your pharmacy operations are ready when you are."
      centerContent
    >
      <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-7">
        <div>
          <label className="mb-2 block text-[16px] text-brand-700">Email</label>
          <Input className="auth-field" type="email" placeholder="you@store.com" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-[16px] text-brand-700">Password</label>
            <Link to="/forgot-password" className="text-xs text-brand-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input className="auth-field" type="password" placeholder="••••••••" {...register("password")} />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
        </div>

        {mutation.isError && (
          <p className="text-sm text-red-600">{getLoginErrorMessage(mutation.error)}</p>
        )}

        <Button type="submit" className="mt-1 h-12 w-full rounded-sm text-base shadow-md" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        New store owner?{" "}
        <Link to="/signup" className="font-medium text-brand-600 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
