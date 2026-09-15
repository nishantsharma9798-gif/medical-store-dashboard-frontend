import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./AuthLayout";

const schema = z
  .object({
    businessName: z.string().min(2, "Enter your store name"),
    adminName: z.string().min(2, "Enter your name"),
    mobileNumber: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
      navigate("/dashboard");
    },
  });

  return (
    <AuthLayout
      title="Register"
      subtitle="Set up your medical store dashboard in a minute"
      welcomeTitle="Welcome to smarter pharmacy management"
      welcomeCopy="Set up your store once and keep billing, inventory, and customers moving together."
    >
      <form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-[16px] text-brand-700">Pharmacy Name</label>
          <Input className="auth-field" placeholder="Sharma Medical Store" {...register("businessName")} />
          {errors.businessName && (
            <p className="mt-1 text-xs text-red-600">{errors.businessName.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-[16px] text-brand-700">Your Name</label>
          <Input className="auth-field" placeholder="Nishant Sharma" {...register("adminName")} />
          {errors.adminName && <p className="mt-1 text-xs text-red-600">{errors.adminName.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-[16px] text-brand-700">Mobile Number</label>
          <Input
            className="auth-field"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543210"
            {...register("mobileNumber")}
          />
          {errors.mobileNumber && <p className="mt-1 text-xs text-red-600">{errors.mobileNumber.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-[16px] text-brand-700">Email</label>
          <Input className="auth-field" type="email" placeholder="you@store.com" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-end justify-between gap-4">
            <label className="mb-2 block text-[16px] text-brand-700">OTP Verification</label>
            <button
              type="button"
              className="mb-2 text-sm font-medium text-brand-600 hover:underline disabled:cursor-not-allowed disabled:text-gray-400"
              disabled={otpRequested}
              onClick={() => {
                const mobileNumber = getValues("mobileNumber");
                if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
                  setOtpMessage("Enter a valid mobile number first.");
                  return;
                }
                setOtpRequested(true);
                setOtpMessage("OTP request ready. Connect your SMS provider to send it.");
              }}
            >
              {otpRequested ? "OTP Requested" : "Request OTP"}
            </button>
          </div>
          <Input className="auth-field" inputMode="numeric" maxLength={6} placeholder="Enter 6-digit OTP" disabled={!otpRequested} />
          {otpMessage && <p className="mt-2 text-xs text-brand-700">{otpMessage}</p>}
        </div>

        <div>
          <label className="mb-2 block text-[16px] text-brand-700">Password</label>
          <Input className="auth-field" type="password" placeholder="••••••••" {...register("password")} />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-[16px] text-brand-700">Confirm Password</label>
          <Input className="auth-field" type="password" placeholder="••••••••" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {mutation.isError && (
          <p className="text-sm text-red-600">Could not create account. This email may already be in use.</p>
        )}

        <Button type="submit" className="h-12 w-full rounded-sm text-base shadow-md" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
