import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CirclePlay,
  Facebook,
  Instagram,
  LineChart,
  Linkedin,
  Mail,
  MapPinned,
  MessageCircleMore,
  PackageSearch,
  Phone,
  FolderKanban,
  ShieldCheck,
  Smartphone,
  Users,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: PackageSearch,
    image: "/images/feature-inventory.jpg",
    title: "Inventory automation",
    description:
      "Scan medicines in and out — purchase or sale — and let stock levels update themselves in real time.",
  },
  {
    icon: MessageCircleMore,
    image: "/images/feature-whatsapp.jpg",
    title: "WhatsApp restock alerts",
    description:
      "Every Friday, get a WhatsApp alert on which medicines will run low over the weekend — order suppliers in one tap.",
  },
  {
    icon: LineChart,
    image: "/images/feature-profit-loss.jpg",
    title: "Profit & loss reports",
    description:
      "See exactly what you earned, spent, and paid in tax — medicine-wise and supplier-wise, any date range.",
  },
];

const PHARMACY_TYPES = [
  { image: "/images/pharmacy-retail.jpg", fallback: "/images/feature-inventory.jpg", title: "Retail Pharmacy", description: "Up to 3 staff members" },
  { image: "/images/pharmacy-large-retail.jpg", fallback: "/images/feature-reports.jpg", title: "Large Retail Pharmacy", description: "Rs 50K+ Daily Sales" },
  { image: "/images/pharmacy-chain.jpg", fallback: "/images/feature-whatsapp.jpg", title: "Chain Pharmacy", description: "Multilocation" },
  { image: "/images/pharmacy-clinical.jpg", fallback: "/images/auth-bg.jpg", title: "Clinical Pharmacy", description: "Clinic attached pharmacy" },
];

const STATS = [
  { value: "10,000+", label: "Active pharmacies" },
  { value: "500+", label: "Cities covered" },
  { value: "15Cr.+", label: "Invoices processed" },
];

const FAQS = [
  "Can I manage more than one pharmacy location?",
  "Will my GST invoices and reports stay compliant?",
  "Can my staff use the system with role-based access?",
];

const PROJECTS = [
  { name: "Medical Store", description: "Inventory, billing and pharmacy operations", path: "/medical/inventory", available: true },
  { name: "Project 2", description: "Coming soon", path: "#", available: false },
  { name: "Project 3", description: "Coming soon", path: "#", available: false },
  { name: "Project 4", description: "Coming soon", path: "#", available: false },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 border-b border-brand-100/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="shrink-0">
            <img src="/images/logo.png" alt="MedStock" className="h-9 w-auto" />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-gray-600 lg:flex">
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 transition-colors hover:text-brand-700">
                <FolderKanban className="h-4 w-4" /> Projects <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="absolute left-1/2 top-8 z-30 w-72 -translate-x-1/2 border border-gray-200 bg-white p-2 shadow-xl">
                {PROJECTS.map((project) => project.available ? (
                  <Link key={project.name} to={project.path} className="flex items-start gap-3 p-3 hover:bg-brand-50">
                    <FolderKanban className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span><span className="block font-semibold text-gray-900">{project.name}</span><span className="block text-xs font-normal text-gray-500">{project.description}</span></span>
                  </Link>
                ) : (
                  <div key={project.name} className="flex items-start gap-3 p-3 opacity-50">
                    <FolderKanban className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                    <span><span className="block font-semibold text-gray-900">{project.name}</span><span className="block text-xs font-normal text-gray-500">{project.description}</span></span>
                  </div>
                ))}
              </div>
            </details>
            <a href="#features" className="transition-colors hover:text-brand-700">Features</a>
            <a href="#pharmacies" className="transition-colors hover:text-brand-700">For pharmacies</a>
            <a href="#pricing" className="transition-colors hover:text-brand-700">Pricing</a>
            <a href="#faq" className="inline-flex items-center gap-1 transition-colors hover:text-brand-700">
              Resources <ChevronDown className="h-4 w-4" />
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost" className="text-brand-700">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="gap-2 px-4 shadow-sm">Start free <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </header>

      <section
        className="relative overflow-hidden bg-brand-900 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-900/80 to-brand-800/35" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 text-white sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-brand-100">
              <span className="h-2 w-2 rounded-full bg-brand-300" /> Built for every pharmacy
            </p>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Care better. <span className="text-brand-300">Run smarter.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
              Billing, inventory, GST compliance and pharmacy operations in one calm, connected dashboard that works on desktop and mobile.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button className="gap-2 bg-brand-400 px-6 py-3 text-base text-brand-950 hover:bg-brand-300">
                  Start your free trial <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="ghost" className="gap-2 px-6 py-3 text-base text-white hover:bg-white/10">
                  <CirclePlay className="h-4 w-4" /> Explore features
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-brand-300" /> No credit card</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-brand-300" /> Quick setup</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-brand-300" /> Human support</span>
            </div>
          </div>
          <div className="hidden justify-center lg:flex">
            <div className="w-full max-w-[560px] rounded-[22px] border border-white/25 bg-black/15 p-4 shadow-2xl backdrop-blur-sm">
              <img
                src="/images/auth-bg.jpg"
                alt="MedStock pharmacy dashboard"
                className="h-[440px] w-full rounded-2xl bg-white object-contain object-center"
                onError={(event) => { event.currentTarget.src = "/images/auth-bg.jpg"; }}
              />
              <div className="flex items-center justify-between px-3 pb-1 pt-5 text-base">
                <span className="text-white/80">Your pharmacy, in control</span>
                <span className="text-brand-200">Live dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-100 bg-brand-50/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-brand-100 px-5 py-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center justify-center gap-3 px-5 py-4 text-center sm:flex-col sm:gap-1">
              <p className="text-3xl font-semibold text-brand-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pharmacies" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">Made for your stage</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">One platform for every kind of pharmacy.</h2>
          <p className="mt-4 text-gray-600">Start with the essentials, then grow into a connected operation without changing the way your team works.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PHARMACY_TYPES.map((type) => (
            <div key={type.title} className="group overflow-hidden border border-gray-200 bg-white transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg">
              <div className="relative h-64 overflow-hidden bg-brand-50">
                <img
                  src={type.image}
                  alt={type.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(event) => { event.currentTarget.src = type.fallback; }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 pt-16 text-white">
                  <h3 className="text-2xl font-semibold">{type.title}</h3>
                  <p className="mt-1 text-sm text-white/90">{type.description}</p>
                </div>
              </div>
              <a href="#features" className="flex items-center gap-2 p-5 text-sm font-semibold text-brand-700">Explore this pharmacy setup <ArrowRight className="h-4 w-4" /></a>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-gray-50 px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">Everything connected</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Less paperwork. More time for people.</h2>
            </div>
            <p className="max-w-xl text-gray-600 lg:justify-self-end">A dependable pharmacy workspace for the busy moments and the decisions behind them.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="overflow-hidden border border-gray-200 bg-white shadow-sm">
                <div className="h-48 bg-brand-50 bg-cover bg-center" style={{ backgroundImage: `url('${feature.image}')` }} />
                <div className="p-6">
                  <feature.icon className="h-6 w-6 text-brand-600" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="overflow-hidden bg-brand-900 p-2">
          <img src="/images/feature-reports.jpg" alt="Pharmacy reporting workspace" className="h-80 w-full object-cover opacity-90" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">Built for confidence</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">The right information, right when you need it.</h2>
          <p className="mt-4 leading-7 text-gray-600">From the counter to the back office, MedStock keeps your team aligned with clear numbers and simple workflows.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="flex gap-3"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-brand-600" /><div><h3 className="font-semibold text-gray-900">Secure by design</h3><p className="mt-1 text-sm text-gray-600">Role-based access keeps sensitive work in the right hands.</p></div></div>
            <div className="flex gap-3"><Smartphone className="mt-1 h-5 w-5 shrink-0 text-brand-600" /><div><h3 className="font-semibold text-gray-900">Works anywhere</h3><p className="mt-1 text-sm text-gray-600">Keep your pharmacy moving on desktop or mobile.</p></div></div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-brand-50 px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">Simple pricing</p><h2 className="mt-3 text-3xl font-semibold text-gray-900">Choose a plan that grows with you.</h2></div>
            <p className="text-sm text-gray-600">Start small. Upgrade when you are ready.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["Starter", "Professional", "Chain"].map((plan, index) => (
              <div key={plan} className={`bg-white p-7 ${index === 1 ? "border-2 border-brand-500 shadow-lg" : "border border-brand-100"}`}>
                {index === 1 && <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Most popular</span>}
                <h3 className="mt-2 text-xl font-semibold text-gray-900">{plan}</h3>
                <p className="mt-2 text-sm text-gray-600">Core tools for confident pharmacy operations.</p>
                <p className="mt-6 text-3xl font-semibold text-brand-800">{["Free", "₹1,250", "₹3,500"][index]}<span className="text-sm font-normal text-gray-500"> / month</span></p>
                <Link to="/signup"><Button className="mt-6 w-full">Get started</Button></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 lg:py-28">
        <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">Questions, answered</p><h2 className="mt-3 text-3xl font-semibold text-gray-900">Everything you need to get started.</h2></div>
        <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
          {FAQS.map((question) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">{question}<ChevronDown className="h-5 w-5 text-brand-600 transition group-open:rotate-180" /></summary><p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">Yes. MedStock is designed to keep setup simple while supporting real pharmacy workflows, teams and locations.</p></details>)}
        </div>
      </section>

      <section className="bg-brand-900 px-5 py-16 text-center text-white lg:px-8">
        <Users className="mx-auto h-8 w-8 text-brand-300" />
        <h2 className="mt-5 text-3xl font-semibold">Ready to care better?</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">Join pharmacy teams using a clearer way to manage their day.</p>
        <Link to="/signup"><Button className="mt-7 bg-brand-300 px-7 text-brand-950 hover:bg-brand-200">Start your free trial <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
      </section>

      <footer className="relative overflow-hidden bg-black px-5 py-14 text-white lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.75fr_0.75fr_0.75fr]">
          <div>
            <img src="/images/logo.png" alt="MedStock" className="h-10 w-auto brightness-0 invert" />
            <div className="mt-8 space-y-3 text-sm text-white/70">
              <a href="tel:8401826262" className="flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 text-brand-400" /> <span className="text-white">Sales</span> 8401826262</a>
              <a href="mailto:sales@medstock.in" className="flex items-center gap-3 hover:text-white"><Mail className="h-4 w-4 text-brand-400" /> sales@medstock.in</a>
              <p className="flex items-center gap-3 pt-6"><MapPinned className="h-4 w-4 text-brand-400" /> Ahmedabad, Gujarat, India</p>
            </div>
            <div className="mt-8 flex gap-5 text-white/50" aria-label="Social links">
              <a href="#" aria-label="Facebook" className="hover:text-brand-300"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-brand-300"><Linkedin className="h-5 w-5" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-brand-300"><Youtube className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-brand-300"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Customers</h3>
            <div className="mt-6 space-y-4 text-sm text-white/60"><a href="#pharmacies" className="block hover:text-white">Retail pharmacy</a><a href="#faq" className="block hover:text-white">FAQs</a><a href="#features" className="block hover:text-white">Step by step videos</a><a href="#pricing" className="block hover:text-white">Book training</a><a href="#" className="block hover:text-white">What's new</a></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Products</h3>
            <div className="mt-6 space-y-4 text-sm text-white/60"><a href="#features" className="block hover:text-white">Run your pharmacy efficiently</a><a href="#features" className="block hover:text-white">Loyalty program</a><a href="#features" className="block hover:text-white">Medguide</a><a href="#features" className="block hover:text-white">Catalogue</a><a href="#features" className="block hover:text-white">Integrations</a><a href="#features" className="block hover:text-white">API products</a></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <div className="mt-6 space-y-4 text-sm text-white/60"><a href="#" className="block hover:text-white">Company</a><a href="#" className="block hover:text-white">Careers</a><a href="mailto:sales@medstock.in" className="block hover:text-white">Contact us</a><a href="#" className="block hover:text-white">Blogs</a></div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} MedStock. Built for medical stores.</span>
          <Link to="/signup"><Button className="h-14 gap-3 rounded-xl bg-brand-500 px-6 text-base text-white shadow-lg shadow-brand-500/20 hover:bg-brand-400"><CalendarDays className="h-5 w-5" /> Book a Demo <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
      </footer>
    </div>
  );
}
