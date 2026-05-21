import { ArrowDown, ArrowUp, Wallet, Target } from "lucide-react";

interface Props {
  income: number;
  expenses: number;
  balance: number;
}

export default function AnalyticsCards({ income, expenses, balance }: Props) {
  const cards = [
    {
      title: "Total Income",
      value: `₹${income}`,
      icon: ArrowUp,
    },
    {
      title: "Total Expenses",
      value: `₹${expenses}`,
      icon: ArrowDown,
    },
    {
      title: "Remaining Balance",
      value: `₹${balance}`,
      icon: Wallet,
    },
    {
      title: "Monthly Goal",
      value: balance > 0 ? "On Track" : "Low Savings",
      icon: Target,
    },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-2xl bg-white/10 p-3">
                <Icon className="text-cyan-400" />
              </div>
            </div>

            <h2 className="mb-2 text-slate-400">{card.title}</h2>

            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
