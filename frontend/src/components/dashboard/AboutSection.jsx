import {
  Target,
  FlaskConical,
  BarChart3,
  Lightbulb,
  ExternalLink,
  BookOpen,
} from "lucide-react";

function Cite({ num, url, children }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-baseline gap-0.5 text-primary hover:underline"
      title={children}
    >
      <sup className="text-[10px] font-bold">[{num}]</sup>
    </a>
  );
}

export default function AboutSection() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 sm:p-10 mb-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full border-[40px] border-white/20" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-slate-300" />
            <span className="text-slate-300 text-sm font-medium uppercase tracking-wider">
              Project Overview
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            About This Project
          </h2>
          <p className="text-slate-300/70 text-sm max-w-xl">
            A science class research project investigating student awareness and
            behavior around infectious disease prevention.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Research Objectives */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-base-content">
                Research Objectives
              </h3>
            </div>
            <div className="space-y-3">
              {[
                "Assess the current level of awareness and practice of infectious disease prevention habits among students.",
                "Identify the most significant gaps in hygiene behavior that contribute to the spread of illness on campus.",
                "Deliver a data-driven intervention — this interactive dashboard — to educate students on evidence-based best practices.",
                "Measure whether increased awareness leads to measurable improvements in daily hygiene habits over time.",
              ].map((obj, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-base-200/50"
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary-content">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-base-content/70 leading-relaxed">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-bold text-base-content">Methodology</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Survey Design",
                  text: "A Google Forms survey was created covering 6 key prevention areas — hand hygiene, staying home when sick, vaccination status, respiratory etiquette, surface disinfection, and exposure control.",
                },
                {
                  title: "Data Collection",
                  text: "Survey responses are collected in Google Sheets and connected to this dashboard via a Google Apps Script API. Data updates in real-time as new responses come in.",
                },
                {
                  title: "Intervention",
                  text: "Students were given access to this dashboard, which displays their collective survey results alongside evidence-based recommendations from the CDC, WHO, and leading universities.",
                },
                {
                  title: "Measurement",
                  text: "Daily hygiene scores were tracked across a baseline period (before dashboard access) and an intervention period (after). Scores are compared to quantify improvement.",
                },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-base-200/50">
                  <h4 className="text-sm font-semibold text-base-content mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-base-content/60 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key context with inline citations */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-base-content">
                Why This Matters
              </h3>
            </div>
            <div className="space-y-3 text-sm text-base-content/70 leading-relaxed">
              <p>
                The CDC estimates that proper hand hygiene alone can reduce
                respiratory infections by 16–21%
                <Cite
                  num={1}
                  url="https://www.cdc.gov/clean-hands/data-research/facts-stats/"
                >
                  CDC, When and How to Wash Your Hands
                </Cite>{" "}
                and diarrheal illness by 23–40%. Despite this, many students
                report inconsistent handwashing habits.
              </p>
              <p>
                Students who attend class while sick contribute directly to
                campus-wide disease transmission. The CDC recommends staying home
                until at least 24 hours after fever resolves without the use of
                fever-reducing medications.
                <Cite
                  num={3}
                  url="https://www.cdc.gov/flu/prevention/index.html"
                >
                  CDC, Stay Home When You Are Sick
                </Cite>
              </p>
              <p>
                Keeping vaccinations current is one of the most effective
                measures for preventing outbreaks in shared environments like
                college campuses.
                <Cite
                  num={4}
                  url="https://www.cdc.gov/vaccines/schedules/hcp/imz/adult.html"
                >
                  CDC, Vaccines for Adults
                </Cite>
              </p>
              <p>
                This project aims to prove that awareness, backed by real data,
                can drive meaningful behavior change. By combining a live
                dashboard with daily habit tracking, we can measure the direct
                impact of education on prevention behavior.
              </p>
            </div>
          </div>
        </div>

        {/* What the dashboard shows */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-info" />
              </div>
              <h3 className="font-bold text-base-content">
                How to Use This Site
              </h3>
            </div>
            <div className="space-y-2 text-sm text-base-content/70">
              <p>
                <strong className="text-base-content">Dashboard</strong> —
                Live survey metrics across 6 prevention categories. Click any
                card for detailed best practices.
              </p>
              <p>
                <strong className="text-base-content">My Habits</strong> —
                Daily hygiene scores over time with baseline vs. intervention
                analysis and auto-generated takeaways.
              </p>
              <p>
                <strong className="text-base-content">Gospel</strong> —
                Connections between disease prevention principles and gospel
                teachings.
              </p>
              <p>
                <strong className="text-base-content">Citations</strong> — All
                10 academic and institutional sources used in this project.
              </p>
              <p>
                <strong className="text-base-content">Present</strong> —
                Slideshow-style presentation for in-class delivery with speaker
                notes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
