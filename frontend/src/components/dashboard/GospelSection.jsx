import { Heart, Quote } from "lucide-react";

export default function GospelSection() {
  return (
    <div>
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 to-pink-700 p-8 sm:p-10 mb-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full border-[40px] border-white/20" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-rose-200" />
            <span className="text-rose-200 text-sm font-medium uppercase tracking-wider">
              Faith Connection
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Clean Hands, Pure Heart
          </h2>
          <p className="text-rose-100/70 text-sm max-w-lg">
            Physical cleanliness and spiritual purity teach the same lesson.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Scripture — Leviticus */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-6">
            <div className="bg-base-200/50 rounded-xl p-5 border-l-4 border-rose-400 mb-4">
              <p className="text-sm text-base-content/80 italic leading-relaxed">
                "And whomsoever he toucheth that hath the issue, and hath not
                rinsed his hands in water, he shall wash his clothes, and bathe
                himself in water, and be unclean until the even."
              </p>
              <p className="text-xs font-semibold text-base-content/50 mt-2">
                — Leviticus 15:11
              </p>
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed">
              The law given to Israel made cleanliness a commandment — not a
              suggestion. Washing protected the entire community from disease.
              It was part of living in a way that preserved health and prevented
              harm from spreading.
            </p>
          </div>
        </div>

        {/* Scripture — Psalms */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-6">
            <div className="bg-base-200/50 rounded-xl p-5 border-l-4 border-violet-400 mb-4">
              <p className="text-sm text-base-content/80 italic leading-relaxed">
                "Who shall ascend into the hill of the Lord? or who shall stand
                in his holy place? He that hath clean hands, and a pure heart."
              </p>
              <p className="text-xs font-semibold text-base-content/50 mt-2">
                — Psalm 24:3–4
              </p>
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Just as washing protects the body, spiritual cleanliness protects
              the soul. Being careful about what we allow into our lives
              preserves spiritual health the same way hygiene preserves physical
              health.
            </p>
          </div>
        </div>

        {/* Prophetic Counsel */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Quote className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-base-content">
                Prophetic Counsel
              </h3>
            </div>
            <div className="space-y-3">
              <div className="bg-base-200/50 rounded-xl p-5 border-l-4 border-amber-400">
                <p className="text-sm text-base-content/80 italic leading-relaxed">
                  "Clean hands and a pure heart are required of those who would
                  stand before the Lord."
                </p>
                <p className="text-xs font-semibold text-base-content/50 mt-2">
                  — President Gordon B. Hinckley
                </p>
              </div>
              <div className="bg-base-200/50 rounded-xl p-5 border-l-4 border-amber-400">
                <p className="text-sm text-base-content/80 italic leading-relaxed">
                  "The Lord loves effort. As we repent and change, we are
                  spiritually cleansed and become more pure before Him."
                </p>
                <p className="text-xs font-semibold text-base-content/50 mt-2">
                  — President Russell M. Nelson
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Parallel — closing card */}
        <div className="card bg-gradient-to-br from-rose-600 to-pink-700 shadow-md">
          <div className="card-body p-6">
            <h3 className="font-bold text-white mb-2">The Parallel</h3>
            <p className="text-sm text-rose-100/80 leading-relaxed">
              We wash our hands daily to stay healthy. We cleanse our spirits
              through repentance, prayer, and obedience to stay spiritually
              healthy. Neglecting either lets harmful things spread. Consistent
              effort — physical and spiritual — protects us and everyone around
              us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
