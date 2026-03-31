import { useEffect } from "react";
import { X, Check, ExternalLink } from "lucide-react";

function boldNumbers(text) {
  return text.replace(
    /(\d+%|\d+\.\d+|\d+)/g,
    '<strong class="font-bold text-base-content">$1</strong>'
  );
}

export default function PracticeModal({ practice, onClose }) {
  const { modal } = practice;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-base-100 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="hero-gradient p-6 sm:rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{modal.title}</h2>
            <button
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              onClick={onClose}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Data insight */}
          <div>
            <h3 className="text-[11px] font-bold text-base-content/40 uppercase tracking-wider mb-2">
              What the data shows
            </h3>
            <div className="bg-base-200/50 rounded-xl p-4 border border-base-200">
              <p
                className="text-base-content/80 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: boldNumbers(modal.dataText),
                }}
              />
              {modal.citation && (
                <a
                  href={modal.citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                >
                  <ExternalLink className="w-3 h-3" />
                  {modal.citation.label}
                </a>
              )}
            </div>
          </div>

          {/* Best practices */}
          <div>
            <h3 className="text-[11px] font-bold text-base-content/40 uppercase tracking-wider mb-2">
              Best Practices
            </h3>
            <ul className="space-y-2.5">
              {modal.practices.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-base-content/70">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action item */}
          <div className="hero-gradient rounded-xl p-4">
            <h3 className="text-sm font-bold text-white mb-1">
              Do this today
            </h3>
            <p className="text-sm text-emerald-100/80">{modal.doToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
