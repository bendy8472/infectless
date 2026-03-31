import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-base-100 border border-base-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-bold text-base-content text-xs mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-base-content/70">
          Score: <strong className="text-base-content">{d.pct.toFixed(0)}%</strong>
        </span>
      </div>
      <div className="flex items-center gap-2 mt-0.5">
        <div className="w-2 h-2 rounded-full bg-base-300" />
        <span className="text-base-content/50">Habits: {d.total} / 9</span>
      </div>
    </div>
  );
}

export default function HabitsChart({ data }) {
  if (!data.length) return null;

  const chartData = data.map((d) => ({
    date: d.date,
    pct: Number(d.score_pct) * 100,
    total: Number(d.total),
  }));

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body p-5 sm:p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-base-content text-sm">
            Daily Score Over Time
          </h3>
          <span className="text-[11px] text-base-content/40">
            {chartData[0]?.date} — {chartData[chartData.length - 1]?.date}
          </span>
        </div>
        <p className="text-xs text-base-content/40 mb-4">
          Orange dashed line = 80% target
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(37, 99, 235)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="rgb(37, 99, 235)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={80}
              stroke="#f59e0b"
              strokeDasharray="6 4"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="pct"
              stroke="rgb(37, 99, 235)"
              strokeWidth={2.5}
              fill="url(#scoreGradient)"
              dot={{ r: 3, fill: "rgb(37, 99, 235)", strokeWidth: 0 }}
              activeDot={{
                r: 5,
                fill: "rgb(37, 99, 235)",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
