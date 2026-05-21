"use client";

interface Props {
  insights: any[];
}

export default function Insights({ insights }: Props) {
  return (
    <div className="mt-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">AI Financial Insights</h2>

        <p className="text-slate-400">
          Smart analysis based on your spending patterns
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur-xl"
          >
            <h3 className="mb-2 text-lg font-bold text-cyan-400">
              {insight.title}
            </h3>

            <p className="text-slate-300">{insight.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
