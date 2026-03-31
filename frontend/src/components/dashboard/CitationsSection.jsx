import { BookOpen, ExternalLink } from "lucide-react";

const citations = [
  {
    authors: "Centers for Disease Control and Prevention",
    year: "2024",
    title: "Clean Hands: Facts & Stats — Handwashing Effectiveness",
    url: "https://www.cdc.gov/clean-hands/data-research/facts-stats/",
    tag: "CDC",
  },
  {
    authors: "World Health Organization",
    year: "2023",
    title: "World Hand Hygiene Day — Evidence-Based Approach",
    url: "https://www.who.int/campaigns/world-hand-hygiene-day",
    tag: "WHO",
  },
  {
    authors: "Centers for Disease Control and Prevention",
    year: "2024",
    title: "Flu Prevention — Stay Home When Sick Guidance",
    url: "https://www.cdc.gov/flu/prevention/index.html",
    tag: "CDC",
  },
  {
    authors: "Centers for Disease Control and Prevention",
    year: "2024",
    title: "Adult Immunization Schedule — Vaccines for College Students",
    url: "https://www.cdc.gov/vaccines/schedules/hcp/imz/adult.html",
    tag: "CDC",
  },
  {
    authors: "Centers for Disease Control and Prevention",
    year: "2024",
    title: "About Flu — Transmission, Symptoms & Seasonal Impact",
    url: "https://www.cdc.gov/flu/about/index.html",
    tag: "CDC",
  },
  {
    authors: "Harvard T.H. Chan School of Public Health",
    year: "2023",
    title: "Coronavirus and Surface Transmission Research",
    url: "https://www.hsph.harvard.edu/news/hsph-in-the-news/",
    tag: "Harvard",
  },
  {
    authors: "Stanford Medicine",
    year: "2023",
    title: "How Germs Spread on Surfaces",
    url: "https://med.stanford.edu/",
    tag: "Stanford",
  },
  {
    authors: "MIT Medical",
    year: "2024",
    title: "Preventing Infectious Disease in College Settings",
    url: "https://medical.mit.edu/",
    tag: "MIT",
  },
  {
    authors: "World Health Organization",
    year: "2024",
    title: "Infection Prevention and Control — Respiratory Hygiene",
    url: "https://www.who.int/publications/i/item/infection-prevention-and-control",
    tag: "WHO",
  },
  {
    authors: "Centers for Disease Control and Prevention",
    year: "2024",
    title: "Infection Control — About How Infections Spread",
    url: "https://www.cdc.gov/infection-control/about/index.html",
    tag: "CDC",
  },
];

const tagColors = {
  CDC: "badge-primary",
  WHO: "badge-info",
  Harvard: "badge-error",
  Stanford: "badge-warning",
  MIT: "badge-secondary",
};

export default function CitationsSection() {
  return (
    <div>
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-700 to-orange-800 p-8 sm:p-10 mb-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full border-[40px] border-white/20" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-amber-200" />
            <span className="text-amber-200 text-sm font-medium uppercase tracking-wider">
              References
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Citations
          </h2>
          <p className="text-amber-100/70 text-sm">
            10 academic and institutional sources from CDC, WHO, Harvard,
            Stanford, and MIT.
          </p>
        </div>
      </div>

      {/* Citation list */}
      <div className="space-y-3">
        {citations.map((c, i) => (
          <a
            key={i}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group card bg-base-100 shadow-sm border border-base-200 hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="card-body p-4 sm:p-5 flex-row items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-base-content/50">
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`badge badge-xs ${tagColors[c.tag]} font-semibold`}
                  >
                    {c.tag}
                  </span>
                  <span className="text-[11px] text-base-content/40">
                    {c.year}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-base-content group-hover:text-primary transition-colors leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-base-content/50 mt-0.5 truncate">
                  {c.authors}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-base-content/20 group-hover:text-primary shrink-0 mt-1 transition-colors" />
            </div>
          </a>
        ))}
      </div>

      {/* Data link */}
      <div className="card bg-base-200/50 border border-base-200 mt-6">
        <div className="card-body p-5 flex-row items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-base-content">
              Raw Survey Data
            </p>
            <p className="text-xs text-base-content/50">
              View all survey responses and habit tracking data
            </p>
          </div>
          <a
            href="https://docs.google.com/spreadsheets/d/1BWgGWDBteff-wSlLzkqQ-CGxTnG69GeknSs4XtN-dx0/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Sheets
          </a>
        </div>
      </div>
    </div>
  );
}
