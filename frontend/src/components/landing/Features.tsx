import { Wallet, PieChart, ShieldCheck, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Expense Analytics",
    description: "Track and analyze your spending patterns.",
    icon: PieChart,
  },
  {
    title: "Budget Planning",
    description: "Set monthly targets and monitor progress.",
    icon: Wallet,
  },
  {
    title: "Secure Authentication",
    description: "JWT authentication with protected routes.",
    icon: ShieldCheck,
  },
  {
    title: "Financial Insights",
    description: "Visualize trends with modern dashboards.",
    icon: TrendingUp,
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold text-white">
          Powerful Features
        </h2>

        <p className="text-slate-400">
          Everything you need to manage personal finances.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg"
            >
              <div className="mb-4 w-fit rounded-2xl bg-white/10 p-3">
                <Icon className="text-cyan-400" />
              </div>

              <h3 className="mb-3 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="text-slate-400">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
