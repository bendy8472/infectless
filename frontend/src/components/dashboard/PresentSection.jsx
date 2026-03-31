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
} from "lucide-react";
import { displayPct } from "./practices";

const HABITS_URL =
  "https://script.google.com/macros/s/AKfycbyywsT28ED9k5hVOXO30O6LeDUM5karrXg7JXb4f1Q6Cp-pDsusIOJymRvgxckk_VFCyQ/exec?sheet=habits";

const practiceIcons = [Droplets, Home, Syringe, Wind, SprayCan, ShieldAlert];
const practiceColors = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-violet-500 to-violet-600",
  "from-orange-500 to-orange-600",
  "from-rose-500 to-rose-600",
  "from-teal-500 to-teal-600",
];

// Background images for visual slides
const images = {
  title:
    "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1200&h=600&fit=crop&q=80",
  method:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop&q=80",
  results:
    "https://images.unsplash.com/photo-1584265549884-cb8ea4cf4e6a?w=1200&h=600&fit=crop&q=80",
  habits:
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop&q=80",
  gospel:
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&h=600&fit=crop&q=80",
  end: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop&q=80",
};

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

  const surveyFindings = [];
  if (m.wash_hands_good_pct != null)
    surveyFindings.push({
      value: displayPct(1 - m.wash_hands_good_pct),
      desc: "don't wash hands properly",
      color: practiceColors[0],
      icon: Droplets,
    });
  if (m.attended_class_sick_pct != null)
    surveyFindings.push({
      value: displayPct(m.attended_class_sick_pct),
      desc: "came to class while ill",
      color: practiceColors[1],
      icon: Home,
    });
  if (m.vax_not_up_to_date_pct != null)
    surveyFindings.push({
      value: displayPct(m.vax_not_up_to_date_pct),
      desc: "not up to date on vaccines",
      color: practiceColors[2],
      icon: Syringe,
    });
  if (m.cough_bad_pct != null)
    surveyFindings.push({
      value: displayPct(m.cough_bad_pct),
      desc: "bad cough/sneeze habits",
      color: practiceColors[3],
      icon: Wind,
    });
  if (m.disinfect_weekly_or_more_pct != null)
    surveyFindings.push({
      value: displayPct(1 - m.disinfect_weekly_or_more_pct),
      desc: "don't disinfect regularly",
      color: practiceColors[4],
      icon: SprayCan,
    });
  if (m.exposure_limit_low_pct != null)
    surveyFindings.push({
      value: displayPct(m.exposure_limit_low_pct),
      desc: "low exposure awareness",
      color: practiceColors[5],
      icon: ShieldAlert,
    });

  return [
    // 0 — Title (with background image)
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
          <p className="text-lg text-white/70">
            Can awareness actually change how students prevent disease?
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

    // 1 — What I Did (with background image)
    {
      bg: images.method,
      render: () => (
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="sm:w-2/5">
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="w-4 h-4 text-white/60" />
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                What I Did
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Survey. Build. Track. Measure.
            </h2>
          </div>
          <div className="sm:w-3/5 flex flex-col gap-2">
            {[
              { num: "01", text: "Surveyed students on 6 prevention habits" },
              { num: "02", text: "Built a live dashboard with Google Sheets API" },
              { num: "03", text: "Tracked daily habits: baseline vs. intervention" },
              { num: "04", text: "Measured if awareness changed behavior" },
            ].map((step) => (
              <div
                key={step.num}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
              >
                <span className="text-xl font-black text-white/25 shrink-0">
                  {step.num}
                </span>
                <p className="text-white/80 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // 2 — Survey Results (with background image)
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
              ? `${m.total_responses} responses`
              : "Live data"}
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

    // 3 — Habit Tracking Results (with background image)
    {
      bg: images.habits,
      render: () => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Habit Tracking
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Did It Work?
          </h2>

          {habits.length > 0 ? (
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Big number */}
              {improvement != null && (
                <div className="sm:w-1/2 bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col items-center justify-center">
                  <p className="text-6xl sm:text-7xl font-black text-white leading-none">
                    {improvement > 0 ? "+" : ""}
                    {improvement.toFixed(0)}%
                  </p>
                  <p className="text-white/50 text-sm mt-3">
                    improvement after intervention
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-white/30">
                    <span>{(baselineAvg * 100).toFixed(0)}%</span>
                    <span>&rarr;</span>
                    <span>{(interventionAvg * 100).toFixed(0)}%</span>
                  </div>
                </div>
              )}

              {/* Stats column */}
              <div className="sm:w-1/2 flex flex-col gap-3">
                {[
                  { val: `${habits.length}`, label: "days tracked" },
                  {
                    val: bestDay != null ? `${(bestDay * 100).toFixed(0)}%` : "—",
                    label: "best single day",
                  },
                  {
                    val: `${daysAtTarget}/${habits.length}`,
                    label: "days above 80% target",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-black/30 backdrop-blur-md rounded-xl px-5 py-4 border border-white/10 flex items-center gap-4"
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

    // 4 — Gospel (with background image)
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
              "He that hath clean hands, and a pure heart… shall ascend into
              the hill of the Lord."
            </p>
            <p className="text-white/40 text-xs">— Psalm 24:3–4</p>
          </div>
          <p className="text-white/70 text-sm leading-relaxed max-w-lg mx-auto">
            Washing protects the body. Repentance, prayer, and obedience protect the
            soul. Neglecting either lets harmful things spread — physically
            and spiritually.
          </p>
        </div>
      ),
    },

    // 5 — Questions (with background image)
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
          <p className="text-lg text-white/50">
            The dashboard is live — explore it anytime.
          </p>
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
    <div className="outline-none" tabIndex={0} role="region" aria-label="Presentation">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-base-content">Presentation</h2>
          <p className="text-xs text-base-content/40">
            Arrow keys or spacebar to navigate
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
          {/* Background image */}
          <img
            src={slide.bg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/65" />
          {/* Content */}
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
