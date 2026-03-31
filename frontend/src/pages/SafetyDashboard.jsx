import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard,
  Activity,
  Info,
  Heart,
  BookOpen,
  Presentation,
  Menu,
  Shield,
} from "lucide-react";
import MetricsHeader from "@/components/dashboard/MetricsHeader";
import KPIRow from "@/components/dashboard/KPIRow";
import PracticeGrid from "@/components/dashboard/PracticeGrid";
import PracticeModal from "@/components/dashboard/PracticeModal";
import AboutSection from "@/components/dashboard/AboutSection";
import CitationsSection from "@/components/dashboard/CitationsSection";
import HabitsTab from "@/components/dashboard/HabitsTab";
import GospelSection from "@/components/dashboard/GospelSection";
import PresentSection from "@/components/dashboard/PresentSection";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyywsT28ED9k5hVOXO30O6LeDUM5karrXg7JXb4f1Q6Cp-pDsusIOJymRvgxckk_VFCyQ/exec";

export default function SafetyDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setMetrics(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "habits", label: "My Habits", icon: Activity },
    { id: "about", label: "About", icon: Info },
    { id: "gospel", label: "Gospel", icon: Heart },
    { id: "citations", label: "Citations", icon: BookOpen },
    { id: "present", label: "Present", icon: Presentation },
  ];

  const switchTab = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="animate-fade-up">
            <MetricsHeader />
            <KPIRow
              metrics={metrics}
              loading={loading}
              error={error}
              onRefresh={fetchMetrics}
            />
            {error && !loading && (
              <div className="text-center text-sm text-base-content/40 mt-6">
                Data unavailable — try refreshing.
              </div>
            )}
            <PracticeGrid
              metrics={metrics}
              loading={loading}
              onSelect={setSelectedPractice}
            />
          </div>
        );
      case "habits":
        return (
          <div className="animate-fade-up">
            <HabitsTab />
          </div>
        );
      case "about":
        return (
          <div className="animate-fade-up">
            <AboutSection />
          </div>
        );
      case "gospel":
        return (
          <div className="animate-fade-up">
            <GospelSection />
          </div>
        );
      case "citations":
        return (
          <div className="animate-fade-up">
            <CitationsSection />
          </div>
        );
      case "present":
        return (
          <div className="animate-fade-up">
            <PresentSection metrics={metrics} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      {/* Premium Navbar */}
      <nav className="bg-base-100/80 backdrop-blur-xl border-b border-base-300/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-base-content tracking-tight">
                  InfectLess
                </span>
                <span className="hidden sm:inline text-xs text-base-content/40 ml-2">
                  Disease Prevention
                </span>
              </div>
            </div>

            {/* Desktop tabs */}
            <div className="hidden lg:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => switchTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-content shadow-sm"
                        : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden btn btn-ghost btn-sm btn-square"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-base-300/50 bg-base-100 pb-3 px-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "text-base-content/60 hover:bg-base-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {renderTab()}
      </main>

      {/* Footer */}
      <footer className="border-t border-base-300/50 bg-base-100/50 backdrop-blur-sm mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-base-content/40">
            <Shield className="w-3.5 h-3.5" />
            <span>InfectLess — Science Class Project</span>
          </div>
          <p className="text-xs text-base-content/30">
            Data sourced from student surveys. All metrics update in real-time.
          </p>
        </div>
      </footer>

      {/* Practice detail modal */}
      {selectedPractice && (
        <PracticeModal
          practice={selectedPractice}
          onClose={() => setSelectedPractice(null)}
        />
      )}
    </div>
  );
}
