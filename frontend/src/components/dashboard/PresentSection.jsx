import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Shield,
  FlaskConical,
  BarChart3,
  TrendingUp,
  Heart,
  MessageCircle,
  Droplets,
  Home,
  Syringe,
  Wind,
  SprayCan,
  ShieldAlert,
  Target,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { displayPct } from "./practices";

const HABITS_URL =
  "https://script.google.com/macros/s/AKfycbyywsT28ED9k5hVOXO30O6LeDUM5karrXg7JXb4f1Q6Cp-pDsusIOJymRvgxckk_VFCyQ/exec?sheet=habits";

const practiceColors = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-violet-500 to-violet-600",
  "from-orange-500 to-orange-600",
  "from-rose-500 to-rose-600",
  "from-teal-500 to-teal-600",
];

const barColors = [
  "#3b82f6",
  "#10b981",
  "#8b5cf6",
  "#f97316",
  "#f43f5e",
  "#14b8a6",
];

const images = {
  title:
    "https://images.unsplash.com/photo-1585559604959-6388fe69c92a?w=1200&h=600&fit=crop&q=80",
  goals:
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop&q=80",
  method:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop&q=80",
  results:
    "https://images.unsplash.com/photo-1584265549884-cb8ea4cf4e6a?w=1200&h=600&fit=crop&q=80",
  findings:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&q=80",
  graph:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&q=80",
  improvement:
    "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=1200&h=600&fit=crop&q=80",
  takeaways:
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=600&fit=crop&q=80",
  gospel:
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&h=600&fit=crop&q=80",
  citations:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop&q=80",
  end: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop&q=80",
};

function SlideTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-2 text-xs">
      <p className="font-bold text-white">{label}</p>
      <p className="text-white/70">
        Score:{" "}
        <strong className="text-white">
          {payload[0].value.toFixed(0)}%
        </strong>
      </p>
    </div>
  );
}

function buildSlides(metrics, habits) {
  const m = metrics || {};
  const avg = (arr) =>
    arr.length
      ? arr.reduce((s, d) => s + Number(d.score_pct), 0) / arr.length
      : 0;

  const baseline = habits.slice(0, 5);
  const intervention = habits.slice(5);
  const baselineAvg = avg(baseline);
  const interventionAvg = intervention.length ? avg(intervention) : null;
  const improvement =
    interventionAvg != null && baselineAvg > 0
      ? ((interventionAvg - baselineAvg) / baselineAvg) * 100
      : null;
  const bestDay = habits.length
    ? Math.max(...habits.map((d) => Number(d.score_pct)))
    : null;
  const daysAtTarget = habits.filter(
    (d) => Number(d.score_pct) >= 0.8
  ).length;

  let bestStreak = 0;
  let currentStreak = 0;
  for (const d of habits) {
    if (Number(d.score_pct) >= 0.8) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  const chartData = habits.map((d, i) => ({
    date: d.date,
    pct: Number(d.score_pct) * 100,
    phase: i < 5 ? "Baseline" : "Intervention",
  }));

  const surveyFindings = [];
  if (m.wash_hands_good_pct != null)
    surveyFindings.push({
      value: displayPct(1 - m.wash_hands_good_pct),
      raw: Math.round((1 - m.wash_hands_good_pct) * 100),
      desc: "don't wash hands properly",
      label: "Hand Hygiene",
      color: practiceColors[0],
      barColor: barColors[0],
      icon: Droplets,
    });
  if (m.attended_class_sick_pct != null)
    surveyFindings.push({
      value: displayPct(m.attended_class_sick_pct),
      raw: Math.round(m.attended_class_sick_pct * 100),
      desc: "came to class while ill",
      label: "Stay Home",
      color: practiceColors[1],
      barColor: barColors[1],
      icon: Home,
    });
  if (m.vax_not_up_to_date_pct != null)
    surveyFindings.push({
      value: displayPct(m.vax_not_up_to_date_pct),
      raw: Math.round(m.vax_not_up_to_date_pct * 100),
      desc: "not up to date on vaccines",
      label: "Vaccination",
      color: practiceColors[2],
      barColor: barColors[2],
      icon: Syringe,
    });
  if (m.cough_bad_pct != null)
    surveyFindings.push({
      value: displayPct(m.cough_bad_pct),
      raw: Math.round(m.cough_bad_pct * 100),
      desc: "bad cough/sneeze habits",
      label: "Respiratory",
      color: practiceColors[3],
      barColor: barColors[3],
      icon: Wind,
    });
  if (m.disinfect_weekly_or_more_pct != null)
    surveyFindings.push({
      value: displayPct(1 - m.disinfect_weekly_or_more_pct),
      raw: Math.round((1 - m.disinfect_weekly_or_more_pct) * 100),
      desc: "don't disinfect regularly",
      label: "Disinfection",
      color: practiceColors[4],
      barColor: barColors[4],
      icon: SprayCan,
    });
  if (m.exposure_limit_low_pct != null)
    surveyFindings.push({
      value: displayPct(m.exposure_limit_low_pct),
      raw: Math.round(m.exposure_limit_low_pct * 100),
      desc: "low exposure awareness",
      label: "Exposure",
      color: practiceColors[5],
      barColor: barColors[5],
      icon: ShieldAlert,
    });

  return [
    // ── 0: TITLE ──────────────────────────────────────────────
    {
      bg: images.title,
      render: () => (
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/80 text-xs font-semibold uppercase tracking-wider mb-4">
            Science Class Project
          </span>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-none mb-4">
            InfectLess
          </h1>
          <p className="text-lg text-white/70 mb-2">
            Can awareness actually change how students prevent disease?
          </p>
          <p className="text-sm text-white/40 max-w-md mx-auto">
            I surveyed students, tracked my own daily hygiene habits, and
            measured whether education drives real behavior change.
          </p>
          {m.total_responses && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/60 text-sm mt-6">
              <span className="font-bold text-white">{m.total_responses}</span>
              survey responses collected
            </div>
          )}
        </div>
      ),
    },

    // ── 1: RESEARCH GOALS ─────────────────────────────────────
    {
      bg: images.goals,
      render: () => (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Research Goals
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            What I Set Out to Do
          </h2>
          <div className="space-y-3">
            {[
              {
                num: "1",
                title: "Assess Current Awareness",
                text: "Survey students on 6 key disease prevention habits to measure where the gaps are.",
              },
              {
                num: "2",
                title: "Identify the Biggest Gaps",
                text: "Pinpoint which hygiene behaviors students struggle with most — hand washing? Vaccination? Staying home when sick?",
              },
              {
                num: "3",
                title: "Deliver a Data-Driven Intervention",
                text: "Build an interactive dashboard that shows students their own data alongside CDC/WHO best practices.",
              },
              {
                num: "4",
                title: "Measure Behavior Change",
                text: "Track my own daily habits before and after using the dashboard to see if awareness leads to real improvement.",
              },
            ].map((goal) => (
              <div
                key={goal.num}
                className="flex items-start gap-4 bg-black/30 backdrop-blur-md rounded-xl px-5 py-4 border border-white/10"
              >
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <span className="text-sm font-black text-white">
                    {goal.num}
                  </span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{goal.title}</p>
                  <p className="text-white/50 text-xs mt-0.5">{goal.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // ── 2: METHODOLOGY ────────────────────────────────────────
    {
      bg: images.method,
      render: () => (
        <div className="flex flex-col sm:flex-row gap-6 items-start max-w-3xl mx-auto">
          <div className="sm:w-2/5">
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="w-4 h-4 text-white/60" />
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                Methodology
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Survey. Build. Track. Measure.
            </h2>
            <p className="text-white/40 text-xs mt-3">
              A 4-step process to test whether data-driven awareness actually
              changes behavior.
            </p>
          </div>
          <div className="sm:w-3/5 flex flex-col gap-2">
            {[
              {
                num: "01",
                title: "Survey Design",
                text: "Created a Google Forms survey covering 6 prevention areas with questions about real daily habits",
              },
              {
                num: "02",
                title: "Data Collection",
                text: "Responses flow into Google Sheets, connected to the dashboard via a live API — data updates in real-time",
              },
              {
                num: "03",
                title: "Intervention",
                text: "Built an interactive dashboard showing survey results + CDC/WHO recommendations as the intervention",
              },
              {
                num: "04",
                title: "Measurement",
                text: "Tracked my own daily hygiene scores across a baseline period (before) and intervention period (after)",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
              >
                <span className="text-xl font-black text-white/25 shrink-0 mt-0.5">
                  {step.num}
                </span>
                <div>
                  <p className="text-white font-bold text-sm">{step.title}</p>
                  <p className="text-white/50 text-xs">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // ── 3: SURVEY RESULTS — CARDS ─────────────────────────────
    {
      bg: images.results,
      render: () => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Survey Results
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
            What Students Reported
          </h2>
          <p className="text-white/40 text-sm mb-5">
            {m.total_responses
              ? `${m.total_responses} responses across 6 prevention categories`
              : "Live data from Google Forms survey"}
          </p>
          {surveyFindings.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {surveyFindings.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="bg-black/30 backdrop-blur-md rounded-xl p-4 text-center border border-white/10"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center mx-auto mb-2`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-3xl font-black text-white leading-none">
                      {f.value}
                    </p>
                    <p className="text-white/50 text-[11px] mt-1.5 leading-tight">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-white/50 text-center py-8">
              Loading survey data...
            </p>
          )}
        </div>
      ),
    },

    // ── 4: SURVEY RESULTS — BAR CHART ─────────────────────────
    {
      bg: images.findings,
      render: () => (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Survey Data Visualized
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Where Students Fall Short
          </h2>
          <p className="text-white/40 text-xs mb-5">
            Percentage of students with gaps in each prevention area — higher
            bars = bigger problems
          </p>
          {surveyFindings.length ? (
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={surveyFindings.map((f) => ({
                    name: f.label,
                    value: f.raw,
                    fill: f.barColor,
                  }))}
                  margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "#ffffff80" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "#ffffff60" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                    width={40}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {surveyFindings.map((f, i) => (
                      <Cell key={i} fill={f.barColor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-white/50 text-center py-8">Loading data...</p>
          )}
        </div>
      ),
    },

    // ── 5: MY HABIT TRACKING GRAPH ────────────────────────────
    {
      bg: images.graph,
      render: () => (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              My Daily Habit Scores
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Tracking My Progress Over Time
          </h2>
          <p className="text-white/40 text-xs mb-4">
            I scored myself on 9 hygiene habits each day — first 5 days as a
            baseline, then after using the dashboard as the intervention.
          </p>
          {chartData.length > 0 ? (
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="slideGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="rgb(59, 130, 246)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor="rgb(59, 130, 246)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 9, fill: "#ffffff60" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "#ffffff60" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                    width={40}
                  />
                  <Tooltip content={<SlideTooltip />} />
                  <ReferenceLine
                    y={80}
                    stroke="#f59e0b"
                    strokeDasharray="6 4"
                    strokeWidth={1.5}
                    label={{
                      value: "80% Target",
                      position: "right",
                      fill: "#f59e0b",
                      fontSize: 10,
                    }}
                  />
                  {chartData.length > 5 && (
                    <ReferenceLine
                      x={chartData[5]?.date}
                      stroke="#10b981"
                      strokeDasharray="4 4"
                      strokeWidth={1}
                      label={{
                        value: "Intervention",
                        position: "top",
                        fill: "#10b981",
                        fontSize: 10,
                      }}
                    />
                  )}
                  <Area
                    type="monotone"
                    dataKey="pct"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth={2.5}
                    fill="url(#slideGradient)"
                    dot={{ r: 3, fill: "rgb(59, 130, 246)", strokeWidth: 0 }}
                    activeDot={{
                      r: 5,
                      fill: "rgb(59, 130, 246)",
                      stroke: "white",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-2 text-[10px] text-white/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-blue-500 rounded" />
                  Daily Score
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-amber-500 rounded" />
                  80% Target
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-emerald-500 rounded" />
                  Intervention Start
                </span>
              </div>
            </div>
          ) : (
            <p className="text-white/50 text-center py-8">
              Loading habit data...
            </p>
          )}
        </div>
      ),
    },

    // ── 6: RESULTS — BIG IMPROVEMENT NUMBER ───────────────────
    {
      bg: images.improvement,
      render: () => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Results
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Did It Work?
          </h2>

          {habits.length > 0 ? (
            <div className="flex flex-col sm:flex-row gap-4">
              {improvement != null && (
                <div className="sm:w-1/2 bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col items-center justify-center">
                  <p className="text-6xl sm:text-7xl font-black text-white leading-none">
                    {improvement > 0 ? "+" : ""}
                    {improvement.toFixed(0)}%
                  </p>
                  <p className="text-white/50 text-sm mt-3">
                    my improvement after intervention
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-white/30">
                    <span className="text-orange-400">
                      {(baselineAvg * 100).toFixed(0)}% baseline
                    </span>
                    <span>&rarr;</span>
                    <span className="text-emerald-400">
                      {(interventionAvg * 100).toFixed(0)}% after
                    </span>
                  </div>
                </div>
              )}

              <div className="sm:w-1/2 flex flex-col gap-3">
                {[
                  { val: `${habits.length}`, label: "total days I tracked" },
                  {
                    val:
                      bestDay != null
                        ? `${(bestDay * 100).toFixed(0)}%`
                        : "—",
                    label: "my best single-day score",
                  },
                  {
                    val: `${daysAtTarget}/${habits.length}`,
                    label: "days I hit the 80% target",
                  },
                  {
                    val: `${bestStreak}`,
                    label: "best streak of 80%+ days in a row",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-black/30 backdrop-blur-md rounded-xl px-5 py-3 border border-white/10 flex items-center gap-4"
                  >
                    <p className="text-2xl font-bold text-white shrink-0 w-16 text-right">
                      {s.val}
                    </p>
                    <p className="text-white/50 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-white/50 text-center py-8">
              Loading habit data...
            </p>
          )}
        </div>
      ),
    },

    // ── 7: KEY TAKEAWAYS ─────────────────────────────────────
    {
      bg: images.takeaways,
      render: () => {
        const takeaways = [];
        if (improvement != null) {
          takeaways.push(
            `Awareness works: my scores jumped from ${(baselineAvg * 100).toFixed(0)}% to ${(interventionAvg * 100).toFixed(0)}% — a ${improvement > 0 ? "+" : ""}${improvement.toFixed(0)}% improvement after using the dashboard.`
          );
        }
        takeaways.push(
          "The survey showed that hand hygiene and surface disinfection are the two biggest gaps among students."
        );
        if (bestStreak >= 3) {
          takeaways.push(
            `Consistency built over time — my best streak was ${bestStreak} days in a row at 80%+.`
          );
        } else {
          takeaways.push(
            "Building consistency is the hardest part — longer tracking periods would help sustain change."
          );
        }
        takeaways.push(
          "Seeing real data from my own community made prevention feel personal, not just textbook advice."
        );

        return (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-white/60" />
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                Key Takeaways
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              What I Learned
            </h2>
            <div className="space-y-2.5">
              {takeaways.map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-black/30 backdrop-blur-md rounded-xl px-5 py-3.5 border border-white/10"
                >
                  <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>
        );
      },
    },

    // ── 8: GOSPEL ────────────────────────────────────────────
    {
      bg: images.gospel,
      render: () => (
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="w-8 h-8 text-white/40 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Clean Hands, Pure Heart
          </h2>
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 text-left mb-4">
            <p className="text-white/80 text-sm italic leading-relaxed mb-3">
              "He that hath clean hands, and a pure heart… shall ascend into the
              hill of the Lord."
            </p>
            <p className="text-white/40 text-xs">— Psalm 24:3–4</p>
          </div>
          <p className="text-white/70 text-sm leading-relaxed max-w-lg mx-auto">
            Washing protects the body. Repentance, prayer, and obedience protect
            the soul. Neglecting either lets harmful things spread — physically
            and spiritually.
          </p>
        </div>
      ),
    },

    // ── 9: SOURCES ───────────────────────────────────────────
    {
      bg: images.citations,
      render: () => (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Sources
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
            10 Academic &amp; Institutional Sources
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { tag: "CDC", count: 5, color: "bg-blue-500/20 text-blue-300" },
              { tag: "WHO", count: 2, color: "bg-cyan-500/20 text-cyan-300" },
              {
                tag: "Harvard",
                count: 1,
                color: "bg-red-500/20 text-red-300",
              },
              {
                tag: "Stanford",
                count: 1,
                color: "bg-amber-500/20 text-amber-300",
              },
              {
                tag: "MIT",
                count: 1,
                color: "bg-violet-500/20 text-violet-300",
              },
            ].map((s) => (
              <div
                key={s.tag}
                className={`${s.color} rounded-xl p-3 text-center backdrop-blur-sm border border-white/5`}
              >
                <p className="text-2xl font-black">{s.count}</p>
                <p className="text-xs font-bold mt-0.5">{s.tag}</p>
              </div>
            ))}
          </div>
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/10 mt-4">
            <p className="text-white/50 text-xs leading-relaxed">
              All recommendations are backed by official guidelines from the CDC,
              WHO, Harvard T.H. Chan School of Public Health, Stanford Medicine,
              and MIT Medical. Full citations available in the Citations tab.
            </p>
          </div>
        </div>
      ),
    },

    // ── 10: QUESTIONS ─────────────────────────────────────────
    {
      bg: images.end,
      render: () => (
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-none mb-4">
            Questions?
          </h1>
          <p className="text-lg text-white/50 mb-6">
            The dashboard is live — explore it anytime.
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/60 text-sm">
              spreadlessdisease.lol
            </div>
            {m.total_responses && (
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/60 text-sm">
                {m.total_responses} responses &middot; {habits.length} days
                tracked
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];
}

export default function PresentSection({ metrics }) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetch(HABITS_URL)
      .then((r) => r.json())
      .then((raw) =>
        setHabits(raw.filter((r) => r.score_pct !== "" && r.total !== ""))
      )
      .catch(() => {});
  }, []);

  const slides = buildSlides(metrics, habits);

  const go = useCallback(
    (dir) => {
      const next = current + dir;
      if (next < 0 || next >= slides.length) return;
      setCurrent(next);
    },
    [current, slides.length]
  );

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go]);

  const slide = slides[current];

  return (
    <div
      className="outline-none"
      tabIndex={0}
      role="region"
      aria-label="Presentation"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-base-content">Presentation</h2>
          <p className="text-xs text-base-content/40">
            Arrow keys or spacebar to navigate &middot; {slides.length} slides
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-base-content/40">
            {current + 1} / {slides.length}
          </span>
          <button
            className="btn btn-ghost btn-sm btn-square"
            onClick={toggleFullscreen}
          >
            {fullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Slide */}
      <div key={current} className="slide-enter">
        <div className="relative overflow-hidden rounded-2xl min-h-[480px] sm:min-h-[520px] flex flex-col justify-center p-8 sm:p-14">
          <img
            src={slide.bg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10">{slide.render()}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5">
        <button
          className="btn btn-outline btn-sm gap-1.5"
          onClick={() => go(-1)}
          disabled={current === 0}
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-primary"
                  : i < current
                  ? "w-1.5 bg-primary/40"
                  : "w-1.5 bg-base-300"
              }`}
            />
          ))}
        </div>

        <button
          className="btn btn-outline btn-sm gap-1.5"
          onClick={() => go(1)}
          disabled={current === slides.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
