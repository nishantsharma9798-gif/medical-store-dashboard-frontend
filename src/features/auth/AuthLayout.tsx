import { Link } from "react-router-dom";
import { Pill } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  welcomeTitle?: string;
  welcomeCopy?: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, welcomeTitle = "Welcome to MedStock", welcomeCopy = "Everything your medical store needs, all in one place." , children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.85fr)]">
      {/* Keep the existing auth artwork and use the green theme as its treatment. */}
      <div
        className="relative hidden min-h-screen overflow-hidden bg-brand-800 bg-cover bg-center lg:block"
        style={{ backgroundImage: "url('/images/auth-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative flex min-h-screen flex-col justify-between p-8 xl:p-12">
          <Link to="/" className="inline-flex w-fit items-center gap-3 text-white">
            <img src="/images/logo.png" alt="MedStock" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <div className="max-w-lg text-white">
            <div className="mb-4 flex items-center gap-2 text-brand-100">
              <Pill className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">MedStock</span>
            </div>
            <p className="text-3xl font-semibold leading-tight xl:text-4xl">
              {welcomeTitle}
            </p>
            <p className="mt-5 max-w-md text-base leading-7 text-white/80">
              {welcomeCopy}
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-screen items-start justify-center bg-white px-6 py-8 sm:px-10 lg:px-12 lg:py-10">
        <div className="w-full max-w-[380px]">
          <div className="mb-12 flex items-center justify-between">
            <Link to="/" className="lg:hidden">
              <img src="/images/logo.png" alt="MedStock" className="h-9 w-auto" />
            </Link>
            <div className="ml-auto flex items-center gap-3 text-lg text-gray-900">
              <span className="text-xl text-brand-500">◉</span>
              <span>84 01 82 62 62</span>
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-[30px] font-normal leading-tight text-brand-700">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
