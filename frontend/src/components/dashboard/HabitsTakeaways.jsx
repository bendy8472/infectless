import { Lightbulb, Sparkles } from "lucide-react";

export default function HabitsTakeaways({ data }) {
  if (!data.length) return null;

  const baseline = data.slice(0, 5);
  const intervention = data.slice(5);

  const avg = (arr) =>
    arr.length
      ? arr.reduce((s, d) => s + Number(d.score_pct), 0) / arr.length
      : 0;

  const baselineAvg = avg(baseline);
  const interventionAvg = intervention.length ? avg(intervention) : null;

  const last7 = data.slice(-7);
  const last7Avg = avg(last7);

  const daysAtTarget = data.filter((d) => Number(d.score_pct) >= 0.8).length;

  let bestStreak = 0;
  let currentStreak = 0;
  for (const d of data) {
    if (Number(d.score_pct) >= 0.8) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  const takeaways = [];

  if (interventionAvg != null && baselineAvg > 0) {
    const change = ((interventionAvg - baselineAvg) / baselineAvg) * 100;
    takeaways.push(
      `From baseline to intervention, your score ${
        change > 0 ? "improved" : "changed"
      } by ${change > 0 ? "+" : ""}${change.toFixed(1)}% — from ${(
        baselineAvg * 100
      ).toFixed(0)}% to ${(interventionAvg * 100).toFixed(0)}%.`
    );
  }

  takeaways.push(
    `In the last 7 days, your average was ${(last7Avg * 100).toFixed(0)}% — ${
      last7Avg >= 0.8 ? "above" : "below"
    } the 80% target.`
  );

  takeaways.push(
    `You hit the 80% target on ${daysAtTarget} out of ${data.length} days. Your best streak was ${bestStreak} day${bestStreak !== 1 ? "s" : ""}.`
  );

  takeaways.push(
    bestStreak >= 3
      ? "Your consistency is building — keep the momentum going!"
      : "Focus on building consistency — try to hit 80%+ for 3 days in a row."
  );

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-warning" />
          </div>
          <h3 className="font-bold text-base-content text-sm">
            Key Takeaways
          </h3>
        </div>
        <div className="space-y-3">
          {takeaways.map((t, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl bg-base-200/50"
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">{i + 1}</span>
              </div>
              <p className="text-sm text-base-content/70 leading-relaxed">
                {t}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
