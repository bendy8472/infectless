import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Activity, ExternalLink } from "lucide-react";
import HabitsStats from "./HabitsStats";
import HabitsChart from "./HabitsChart";
import HabitsTakeaways from "./HabitsTakeaways";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyywsT28ED9k5hVOXO30O6LeDUM5karrXg7JXb4f1Q6Cp-pDsusIOJymRvgxckk_VFCyQ/exec?sheet=habits";

export default function HabitsTab() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Network error");
      const raw = await res.json();
      const filtered = raw.filter(
        (r) => r.score_pct !== "" && r.total !== ""
      );
      setData(filtered);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-10 mb-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border-[30px] border-white/20" />
        </div>
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-200" />
              <span className="text-blue-200 text-sm font-medium uppercase tracking-wider">
                Habit Tracker
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
              My Habits
            </h2>
            <p className="text-blue-100/70 text-sm">
              Daily hygiene habit tracking — baseline vs. intervention
            </p>
          </div>
          <button
            className="btn btn-ghost btn-sm text-white/60 hover:text-white hover:bg-white/10"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-16 gap-3">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-sm text-base-content/40">Loading habit data...</p>
        </div>
      ) : error ? (
        <div className="card bg-base-100 border border-base-200 p-12 text-center">
          <p className="text-base-content/50 mb-4">
            Could not load habit data.
          </p>
          <button className="btn btn-primary btn-sm mx-auto" onClick={fetchData}>
            Try again
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <HabitsStats data={data} />
          <HabitsChart data={data} />
          <HabitsTakeaways data={data} />
        </div>
      )}

      <div className="flex justify-center mt-8">
        <a
          href="https://docs.google.com/spreadsheets/d/1BWgGWDBteff-wSlLzkqQ-CGxTnG69GeknSs4XtN-dx0/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View raw data in Google Sheets
        </a>
      </div>
    </div>
  );
}
