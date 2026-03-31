import { Shield, TrendingUp, Users } from "lucide-react";

export default function MetricsHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl hero-gradient p-8 sm:p-10 mb-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full border-[40px] border-white/20" />
        <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full border-[30px] border-white/20" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-emerald-100 text-sm font-medium uppercase tracking-wider">
            Live Dashboard
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-2">
          Infectious Disease
          <br />
          Prevention Dashboard
        </h1>
        <p className="text-emerald-100/80 text-sm sm:text-base max-w-lg">
          Real-time student survey data across 6 evidence-based prevention
          practices. Powered by live Google Sheets integration.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2 text-emerald-100/70 text-xs">
            <Users className="w-3.5 h-3.5" />
            <span>Student Survey Data</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-100/70 text-xs">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Baseline vs. Intervention</span>
          </div>
        </div>
      </div>
    </div>
  );
}
