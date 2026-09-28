import { Link } from "react-router-dom";
import { Barcode, BellRing, CalendarDays, PackageSearch, ReceiptText, TrendingDown } from "lucide-react";

const AUTH_FEATURES = [
  { icon: PackageSearch, title: "Live Stock Tracking", description: "Know what’s available, always." },
  { icon: CalendarDays, title: "Expiry Watch", description: "Spot medicines approaching expiry." },
  { icon: ReceiptText, title: "Quick Billing with GST", description: "Create counter bills and record sales." },
  { icon: BellRing, title: "Low-stock Alerts", description: "Prepare restocks before items run out." },
  { icon: Barcode, title: "Manual Medicine Entry", description: "Add items even without a barcode." },
  { icon: TrendingDown, title: "Slow-stock Review", description: "Review items with no sale in 30 days." },
];

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  welcomeTitle?: string;
  welcomeCopy?: string;
  centerContent?: boolean;
  children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, welcomeTitle = "", welcomeCopy = "", centerContent = false, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#f3f5f4] lg:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.85fr)]">
      <div
        className="relative hidden min-h-screen overflow-hidden bg-cover bg-center lg:block"
        style={{ backgroundImage: "url('/images/medicine-supply.jpg')" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(242,247,243,0.92),rgba(242,247,243,0.72),rgba(242,247,243,0.18))]" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between px-8 py-5 xl:px-10 xl:py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-xl font-black text-white shadow-lg shadow-brand-600/30">
              M
            </div>
            <span className="text-[2.1rem] font-black tracking-[-0.08em] text-brand-700">MedStock</span>
          </div>

          <div className="max-w-[680px]">
            <h2 className="text-[3rem] font-black leading-[0.92] tracking-[-0.08em] text-brand-900 xl:text-[4rem]">
              {welcomeTitle || "Manage Your Pharmacy, Smarter"}
            </h2>

            <p className="mt-4 max-w-[540px] text-xl font-medium leading-[1.2] tracking-[-0.04em] text-brand-800/80">
              {welcomeCopy || "Keep your inventory, sales and purchases synced — all in one place."}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {AUTH_FEATURES.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex min-w-0 items-center gap-2 rounded-xl border border-white/40 bg-white/35 px-2.5 py-2 shadow-sm backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#daf0de] text-brand-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight text-brand-900">{title}</p>
                    <p className="mt-0.5 text-xs leading-tight text-brand-800/75">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`relative flex min-h-screen ${centerContent ? "items-center" : "items-start"} justify-center bg-[#f2f7f3] px-6 py-4 sm:px-10 sm:py-6 lg:px-12 lg:py-6`}>
        <div className="w-full max-w-[520px]">
          <div className="mb-2 flex min-h-9 items-center justify-between">
            <Link to="/" className="lg:hidden">
              <img src="/images/logo.png" alt="MedStock" className="h-9 w-auto" />
            </Link>
            <div className="ml-auto flex items-center gap-3 text-lg text-gray-900" />
          </div>

          <div className="mb-3">
            <h1 className="text-[2.35rem] font-semibold leading-none tracking-[-0.06em] text-brand-700 sm:text-[2.6rem]">
              {title}
            </h1>
            <p className="mt-3 text-base leading-6 text-gray-500">{subtitle}</p>
          </div>

          <div className="rounded-[24px] border border-brand-100 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
