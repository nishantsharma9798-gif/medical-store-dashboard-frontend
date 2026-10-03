import { Link } from "react-router-dom";
import {
  ArrowRight,
  Barcode,
  CalendarDays,
  Check,
  ChevronDown,
  CirclePlay,
  Facebook,
  FolderKanban,
  Instagram,
  Linkedin,
  Mail,
  MapPinned,
  MessageCircleMore,
  PackageSearch,
  Phone,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  TrendingDown,
  Users,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  { name: "Inventory", description: "Track stock and expiry", path: "/inventory", available: true },
  { name: "Billing", description: "Quick counter sales", path: "/billing", available: true },
  { name: "Suppliers", description: "Order management", path: "/suppliers", available: false },
  { name: "Reports", description: "Business insights", path: "/reports", available: false },
];

const PHARMACY_TYPES = [
  {
    title: "Retail pharmacy",
    description: "Daily sales and stock tracking",
    image: "/images/pharmacy-large-retail.jpeg",
    fallback: "/images/pharmacy-large-retail.jpeg",
  },
  {
    title: "Clinic store",
    description: "Fast purchase and refill management",
    image: "/images/pharmacy-clinical.jpeg",
    fallback: "/images/pharmacy-clinical.jpeg",
  },
  {
    title: "Chain outlet",
    description: "Centralised ordering and controls",
    image: "/images/pharmacy-chain.png",
    fallback: "/images/pharmacy-chain.png",
  },
  {
    title: "Wholesale channel",
    description: "Volume-led stock monitoring",
    image: "/images/pharmacy-products.jpg",
    fallback: "/images/pharmacy-products.jpg",
  },
];

const FEATURES = [
  {
    icon: PackageSearch,
    image: "/images/know_your_stock_live.jpg",
    title: "Know your stock, live",
    description: "Sales and purchase entries update stock so your team can see what is available before promising it.",
  },
  {
    icon: CalendarDays,
    image: "/images/expiry_watch.jpg",
    title: "Expiry watch",
    description: "See medicine records approaching expiry and review them before stock turns into avoidable loss.",
  },
  {
    icon: ReceiptText,
    image: "/images/feature-profit-loss.png",
    title: "Quick billing with GST estimate",
    description: "Build a counter bill quickly, calculate GST from saved medicine rates, and record the sale against stock.",
  },
  {
    icon: MessageCircleMore,
    image: "/images/Restock.png",
    title: "Restock before it runs out",
    description: "Low-stock alerts help your team prepare a reorder request for the mapped supplier.",
  },
  {
    icon: Barcode,
    image: "/images/barcode.png",
    title: "Add items without a barcode",
    description: "Create a medicine record manually with opening stock, GST rate and expiry date when no barcode is available.",
  },
  {
    icon: TrendingDown,
    image: "/images/slow-moving.png",
    title: "Spot slow-moving stock",
    description: "Review stocked medicines with no recorded sale in 30 days to make better purchasing decisions.",
  },
];

const PHARMACY_PROBLEMS = [
  { problem: "Staff are unsure what is in stock", feature: "Real-time inventory", benefit: "Fewer missed sales" },
  { problem: "Expiry dates are easy to miss", feature: "Expiry watch on medicine records", benefit: "Better stock control" },
  { problem: "Billing takes too many clicks", feature: "Quick billing with GST estimate", benefit: "Faster checkout" },
  { problem: "Popular medicines run out", feature: "Daily stock overview", benefit: "Better decisions" },
  { problem: "Low stock is noticed too late", feature: "Restock alerts for mapped suppliers", benefit: "Fewer lost sales" },
  { problem: "Some medicines have no barcode", feature: "Manual stock entry", benefit: "Nothing left out of the system" },
  { problem: "Slow sellers tie up working capital", feature: "30-day no-sale review", benefit: "Smarter purchasing" },
];

const WORKFLOW_OUTCOMES = [
  { value: "Quick checkout", label: "Less counter friction" },
  { value: "Clear stock", label: "Fewer inventory surprises" },
  { value: "Better buying", label: "More informed decisions" },
];

const FAQS = [
  {
    question: "How does pharmacy inventory management software work?",
    answer: "MedStock keeps medicine stock in one place. Recorded purchase and sale entries update quantities, while the dashboard helps you review low stock, expiry dates and medicines with no recent sales.",
  },
  {
    question: "Can I track medicine expiry dates and near-expiry stock?",
    answer: "Yes. Add an expiry date to a medicine record and the dashboard highlights medicines that are due to expire within the next 30 days.",
  },
  {
    question: "Does MedStock manage batch-wise inventory?",
    answer: "MedStock currently tracks stock and expiry dates on medicine records, but it does not yet keep separate batch or lot records.",
  },
  {
    question: "Can I access pharmacy reports on mobile or laptop?",
    answer: "You can open MedStock in a browser on desktop, tablet or mobile. The dashboard and available report screens adapt to the device size.",
  },
  {
    question: "What makes MedStock useful for a pharmacy?",
    answer: "It brings inventory, expiry and low-stock visibility, quick billing, supplier restocking and sales summaries into one workspace.",
  },
  {
    question: "Can I add a medicine without a barcode?",
    answer: "Yes. Add it manually with its name, opening stock, low-stock threshold, GST rate and expiry date.",
  },
  {
    question: "Does quick billing update stock?",
    answer: "Recorded sale entries update inventory. Billing shows a GST estimate from the rate saved on each medicine.",
  },
  {
    question: "How do low-stock alerts work?",
    answer: "The dashboard flags medicines at or below their saved stock threshold so you can review what may need restocking.",
  },
  {
    question: "Can I contact MedStock on WhatsApp?",
    answer: "Yes. Message or call the owner directly at +91 88592 85605.",
  },
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
              <span className="h-2 w-2 rounded-full bg-brand-300" /> India's Most Trusted Pharmacy Growth System Built for Every One.
            </p>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Run smarter. <span className="text-brand-300">Grow better.</span>
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-brand-100 px-5 py-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          {WORKFLOW_OUTCOMES.map((outcome) => (
            <div key={outcome.label} className="flex items-center justify-center gap-3 px-5 py-4 text-center sm:flex-col sm:gap-1">
              <p className="text-xl font-semibold text-brand-800">{outcome.value}</p>
              <p className="text-sm text-gray-600">{outcome.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="border-y border-brand-100/70 bg-[#f5f9f6] px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-4xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
              <span className="h-2 w-2 rounded-full bg-brand-500" /> Made for medical stores
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.04em] text-gray-900 lg:text-[2.75rem]">
              Everyday problems, handled at the counter.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              See how one connected workspace helps your team stay ahead of daily pharmacy work.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-[0_16px_36px_rgba(20,83,45,0.08)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
                <thead className="bg-brand-900 text-xs uppercase tracking-[0.14em] text-white">
                  <tr>
                    <th className="w-[34%] border-b border-white/10 px-5 py-4 font-semibold sm:px-6">Without a system</th>
                    <th className="w-[40%] border-b border-white/10 bg-brand-800 px-5 py-4 font-semibold sm:px-6">With MedStock</th>
                    <th className="w-[26%] border-b border-white/10 px-5 py-4 font-semibold sm:px-6">Business benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {PHARMACY_PROBLEMS.map((row) => (
                    <tr key={row.problem} className="group transition-colors hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm leading-6 text-gray-600 sm:px-6 sm:py-[1.125rem]">{row.problem}</td>
                      <td className="bg-brand-50/70 px-5 py-4 text-sm font-semibold leading-6 text-brand-900 transition-colors group-hover:bg-brand-100/80 sm:px-6 sm:py-[1.125rem]">
                        <span className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                            <Check className="h-4 w-4" strokeWidth={2.5} />
                          </span>
                          {row.feature}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold leading-6 text-brand-700 sm:px-6 sm:py-[1.125rem]">{row.benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="pharmacies" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Made for your stage</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-gray-900 sm:text-5xl">
            One platform for every kind of pharmacy.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start with the essentials, then grow into a connected operation without changing the way your team works.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PHARMACY_TYPES.map((type) => (
            <div
              key={type.title}
              className="group overflow-hidden rounded-[22px] border border-brand-100 bg-white shadow-[0_18px_34px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_28px_50px_rgba(20,83,45,0.12)]"
            >
              <div className="relative h-72 overflow-hidden bg-brand-50">
                <img
                  src={type.image}
                  alt={type.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(event) => { event.currentTarget.src = type.fallback; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-[1.8rem] font-semibold leading-none">{type.title}</h3>
                  <p className="mt-2 text-sm text-white/90">{type.description}</p>
                </div>
              </div>
              <a href="#features" className="flex items-center justify-between gap-2 px-5 py-4 text-sm font-semibold text-brand-700">
                <span>Explore this pharmacy setup</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="bg-gray-50 px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">Everything connected</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Less paperwork. More time for people.</h2>
            </div>
            <p className="max-w-xl text-gray-600 lg:justify-self-end">A dependable pharmacy workspace for the busy moments and the decisions behind them.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                <p className="mt-6 text-3xl font-semibold text-brand-800">{["Free", "₹999/", "₹2999/"][index]}<span className="text-sm font-normal text-gray-500"> / month</span></p>
                <Link to="/signup"><Button className="mt-6 w-full">Get started</Button></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 lg:py-28">
        <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">Questions, answered</p><h2 className="mt-3 text-3xl font-semibold text-gray-900">Everything you need to get started.</h2></div>
        <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
          {FAQS.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                {item.question}
                <ChevronDown className="h-5 w-5 text-brand-600 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">{item.answer}</p>
            </details>
          ))}
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
              <a href="tel:+918859285605" className="flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 text-brand-400" /> <span className="text-white">Sales</span> +91 88592 85605</a>
              <a href="mailto:sales@medstock.in" className="flex items-center gap-3 hover:text-white"><Mail className="h-4 w-4 text-brand-400" /> sales@medstock.in</a>
              <p className="flex items-center gap-3 pt-6"><MapPinned className="h-4 w-4 text-brand-400" /> Noida, Uttar Pradesh, India</p>
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
        <div className="mx-auto mt-8 flex max-w-7xl items-center gap-4 border-t border-white/10 pt-6">
          <img
            src="/images/com-logo.jpg"
            alt="Kivion Tech logo"
            className="h-12 w-20 rounded-md bg-white object-contain p-1.5"
            onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}
          />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">Technology partner</p>
            <p className="mt-1 text-sm font-semibold text-white">Kivion Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
