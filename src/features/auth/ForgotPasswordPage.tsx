import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./AuthLayout";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({ email: z.string().email("Enter a valid email") });
type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (_data, email) => setSubmittedEmail(email),
  });

  return (
    <AuthLayout title="Forgot password" subtitle="We'll email you a reset link">
      {submittedEmail ? (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
          <div className="mb-1 flex items-center gap-2 font-medium">
            <CheckCircle2 className="h-4 w-4" /> Check your inbox
          </div>
          <p>
            If an account exists for <strong>{submittedEmail}</strong>, a password reset link has been
            sent. It may take a minute to arrive.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit((values) => mutation.mutate(values.email))} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input type="email" placeholder="you@store.com" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-gray-500">
        Remembered it?{" "}
        <Link to="/login" className="font-medium text-brand-600 hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
