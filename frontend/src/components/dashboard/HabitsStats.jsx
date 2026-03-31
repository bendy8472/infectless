import { TrendingUp, Award, Target, Calendar } from "lucide-react";

export default function HabitsStats({ data }) {
  if (!data.length) return null;

  const baseline = data.slice(0, 5);
  const intervention = data.slice(5);

  const avg = (arr) =>
    arr.length
      ? arr.reduce((s, d) => s + Number(d.score_pct), 0) / arr.length
      : 0;

  const baselineAvg = avg(baseline);
  const interventionAvg = intervention.length ? avg(intervention) : null;
  const improvement =
    interventionAvg != null && baselineAvg > 0
      ? ((interventionAvg - baselineAvg) / baselineAvg) * 100
      : null;

  const overallAvg = avg(data);
  const bestDay = Math.max(...data.map((d) => Number(d.score_pct)));
  const daysAtTarget = data.filter((d) => Number(d.score_pct) >= 0.8).length;

  return (
    <div className="space-y-5">
      {/* Improvement banner */}
      {improvement != null && (
        <div className="card bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md">
          <div className="card-body p-5 flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">
                {improvement > 0 ? "+" : ""}
                {improvement.toFixed(1)}%
                <span className="text-sm font-medium text-emerald-100 ml-2">
                  improvement
                </span>
              </p>
              <p className="text-sm text-emerald-100/80">
                Baseline: {(baselineAvg * 100).toFixed(0)}% → Intervention:{" "}
                {(interventionAvg * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-5 flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-base-content/40 font-semibold">
                Overall Average
              </p>
              <p className="text-xl font-bold text-base-content">
                {(overallAvg * 100).toFixed(0)}%
              </p>
              <p className="text-[11px] text-base-content/30">
                {data.length} days tracked
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-5 flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-base-content/40 font-semibold">
                Best Day
              </p>
              <p className="text-xl font-bold text-base-content">
                {(bestDay * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-5 flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-base-content/40 font-semibold">
                Days at Target
              </p>
              <p className="text-xl font-bold text-base-content">
                {daysAtTarget}{" "}
                <span className="text-sm font-normal text-base-content/40">
                  / {data.length}
                </span>
              </p>
              <p className="text-[11px] text-base-content/30">80%+ threshold</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
