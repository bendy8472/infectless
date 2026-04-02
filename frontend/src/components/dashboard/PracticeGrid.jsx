import { getPractices } from "./practices";
import {
  Droplets,
  Home,
  Syringe,
  Wind,
  SprayCan,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

const iconMap = { Droplets, Home, Syringe, Wind, SprayCan, ShieldAlert };

const styleMap = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    light: "bg-blue-50 text-blue-600 border-blue-100",
    badge: "bg-blue-100 text-blue-700",
  },
  emerald: {
    gradient: "from-emerald-500 to-emerald-600",
    light: "bg-emerald-50 text-emerald-600 border-emerald-100",
    badge: "bg-emerald-100 text-emerald-700",
  },
  violet: {
    gradient: "from-violet-500 to-violet-600",
    light: "bg-violet-50 text-violet-600 border-violet-100",
    badge: "bg-violet-100 text-violet-700",
  },
  orange: {
    gradient: "from-orange-500 to-orange-600",
    light: "bg-orange-50 text-orange-600 border-orange-100",
    badge: "bg-orange-100 text-orange-700",
  },
  rose: {
    gradient: "from-rose-500 to-rose-600",
    light: "bg-rose-50 text-rose-600 border-rose-100",
    badge: "bg-rose-100 text-rose-700",
  },
  teal: {
    gradient: "from-teal-500 to-teal-600",
    light: "bg-teal-50 text-teal-600 border-teal-100",
    badge: "bg-teal-100 text-teal-700",
  },
};

// Unsplash images for each practice
const imageMap = {
  "hand-hygiene":
    "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=400&h=250&fit=crop&q=80",
  "stay-home":
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop&q=80",
  vaccination:
    "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=400&h=250&fit=crop&q=80",
  respiratory:
    "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=250&fit=crop&q=80",
  disinfect:
    "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=250&fit=crop&q=80",
  exposure:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop&q=80",
};

export default function PracticeGrid({ metrics, loading, onSelect }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-sm border border-base-200">
            <div className="skeleton h-36 rounded-t-2xl rounded-b-none"></div>
            <div className="card-body p-5">
              <div className="skeleton h-4 w-32 mb-2"></div>
              <div className="skeleton h-6 w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const practices = getPractices(metrics);

  return (
    <div>
      <h2 className="text-lg font-bold text-base-content mb-1">
        6 Evidence-Based Practices
      </h2>
      <p className="text-sm text-base-content/50 mb-5">
        Click any card to learn more and get actionable steps.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {practices.map((p) => {
          const Icon = iconMap[p.icon];
          const style = styleMap[p.color];
          const img = imageMap[p.id];
          return (
            <div
              key={p.id}
              className="group card bg-base-100 shadow-sm border border-base-200 hover:shadow-lg hover:border-base-300 transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
              onClick={() => onSelect(p)}
            >
              {/* Image header */}
              <figure className="relative h-36 overflow-hidden">
                <img
                  src={img}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-sm`}
                  >
                    {Icon && <Icon className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-white font-semibold text-sm drop-shadow-md">
                    {p.name}
                  </span>
                </div>
              </figure>

              {/* Card body */}
              <div className="card-body p-4 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${style.badge}`}
                    >
                      {p.badgeValue}
                    </span>
                    <span className="text-xs text-base-content/50">
                      {p.badgeLabel}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-base-content/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
