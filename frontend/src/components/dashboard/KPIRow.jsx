import { RefreshCw, Users, TrendingUp, Clock } from "lucide-react";

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function KPIRow({ metrics, loading, error, onRefresh }) {
  const kpis = [
    {
      label: "Total Responses",
      value: metrics?.total_responses ?? "—",
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Likelihood to Improve",
      value: metrics?.behavior_change_avg
        ? `${Number(metrics.behavior_change_avg).toFixed(1)} / 5`
        : "—",
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Last Updated",
      value: formatDate(metrics?.updated_at),
      icon: Clock,
      color: "text-info",
      bg: "bg-info/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            className={`card bg-base-100 shadow-sm border border-base-200 animate-fade-up-delay-${i + 1}`}
          >
            <div className="card-body p-5 flex-row items-center gap-4">
              <div
                className={`w-11 h-11 rounded-xl ${kpi.bg} flex items-center justify-center shrink-0`}
              >
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-base-content/40 font-semibold">
                  {kpi.label}
                </p>
                {loading ? (
                  <div className="skeleton h-6 w-20 mt-1 rounded-md"></div>
                ) : (
                  <p className="text-lg font-bold text-base-content truncate">
                    {error ? "Unavailable" : kpi.value}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className="sm:col-span-3 flex justify-end -mt-2">
        <button
          className="btn btn-ghost btn-xs gap-1.5 text-base-content/40 hover:text-base-content"
          onClick={onRefresh}
          title="Refresh data"
        >
          <RefreshCw className="w-3 h-3" />
          Refresh
        </button>
      </div>
    </div>
  );
}
