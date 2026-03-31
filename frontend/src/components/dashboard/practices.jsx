export function displayPct(x) {
  if (x == null || isNaN(x)) return "—";
  return `${Math.round(x * 100)}%`;
}

export function getPractices(metrics) {
  const m = metrics || {};
  return [
    {
      id: "hand-hygiene",
      icon: "Droplets",
      color: "blue",
      name: "Hand Hygiene",
      badgeValue: displayPct(
        m.wash_hands_good_pct ? 1 - m.wash_hands_good_pct : null
      ),
      badgeLabel: "Need improvement",
      modal: {
        title: "Hand Hygiene",
        dataText: `${displayPct(m.wash_hands_good_pct ? 1 - m.wash_hands_good_pct : null)} of surveyed students do not wash their hands properly or frequently enough. The CDC reports that handwashing can reduce respiratory illness by 16–21% and diarrheal disease by 23–40%.`,
        citation: {
          label: "CDC — Clean Hands: Facts & Stats",
          url: "https://www.cdc.gov/clean-hands/data-research/facts-stats/",
        },
        practices: [
          "Wash with soap and water for at least 20 seconds",
          "Use hand sanitizer (60%+ alcohol) when soap isn't available",
          "Wash before eating, after restroom, after coughing/sneezing",
          "Avoid touching your face with unwashed hands",
        ],
        doToday:
          "Set a phone reminder to wash your hands before every meal today.",
      },
    },
    {
      id: "stay-home",
      icon: "Home",
      color: "emerald",
      name: "Stay Home When Sick",
      badgeValue: displayPct(m.attended_class_sick_pct),
      badgeLabel: "Attended class sick",
      modal: {
        title: "Stay Home When Sick",
        dataText: `${displayPct(m.attended_class_sick_pct)} of students reported attending class while sick — spreading illness to classmates, professors, and staff. The CDC recommends staying home until at least 24 hours after fever resolves without fever-reducing medication.`,
        citation: {
          label: "CDC — Flu Prevention",
          url: "https://www.cdc.gov/flu/prevention/index.html",
        },
        practices: [
          "Stay home if you have a fever, vomiting, or diarrhea",
          "Notify your professor by email — most offer accommodations",
          "Return only after 24 hours symptom-free (no meds)",
          "If you must attend, wear a mask and sit away from others",
        ],
        doToday:
          "Draft a quick email template you can send to professors if you get sick.",
      },
    },
    {
      id: "vaccination",
      icon: "Syringe",
      color: "violet",
      name: "Vaccination",
      badgeValue: displayPct(m.vax_not_up_to_date_pct),
      badgeLabel: "Not up to date",
      modal: {
        title: "Vaccination",
        dataText: `${displayPct(m.vax_not_up_to_date_pct)} of students are not up to date on recommended vaccinations — leaving gaps in campus-wide immunity. The CDC recommends annual flu shots, current COVID-19 boosters, and up-to-date MMR, Tdap, and meningitis vaccines for college students.`,
        citation: {
          label: "CDC — Adult Immunization Schedule",
          url: "https://www.cdc.gov/vaccines/schedules/hcp/imz/adult.html",
        },
        practices: [
          "Get your annual flu shot (CDC recommends by end of October)",
          "Stay current on COVID-19 boosters",
          "Check your MMR, Tdap, and meningitis status",
          "Visit your campus health center for a free vaccine check",
        ],
        doToday:
          "Check your immunization record on your student health portal today.",
      },
    },
    {
      id: "respiratory",
      icon: "Wind",
      color: "orange",
      name: "Respiratory Etiquette",
      badgeValue: displayPct(m.cough_bad_pct),
      badgeLabel: "Poor etiquette",
      modal: {
        title: "Respiratory Etiquette",
        dataText: `${displayPct(m.cough_bad_pct)} of students reported poor cough/sneeze habits — a major route for airborne and droplet transmission. The WHO emphasizes covering coughs and sneezes as a front-line defense against respiratory infections.`,
        citation: {
          label: "WHO — Respiratory Hygiene",
          url: "https://www.who.int/publications/i/item/infection-prevention-and-control",
        },
        practices: [
          "Cover coughs and sneezes with your elbow, not your hand",
          "Use a tissue and discard it immediately",
          "Wash or sanitize hands right after coughing/sneezing",
          "Keep distance from others if you have respiratory symptoms",
        ],
        doToday:
          "Practice covering your cough with your elbow for the rest of today.",
      },
    },
    {
      id: "disinfect",
      icon: "SprayCan",
      color: "rose",
      name: "Disinfect High-Touch Items",
      badgeValue: displayPct(
        m.disinfect_weekly_or_more_pct
          ? 1 - m.disinfect_weekly_or_more_pct
          : null
      ),
      badgeLabel: "Rarely disinfect",
      modal: {
        title: "Disinfect High-Touch Items",
        dataText: `${displayPct(m.disinfect_weekly_or_more_pct ? 1 - m.disinfect_weekly_or_more_pct : null)} of students do not regularly disinfect their phones, laptops, and desks. Studies from Harvard and Stanford show these surfaces can harbor bacteria and viruses for hours to days.`,
        citation: {
          label: "Harvard — Surface Transmission Research",
          url: "https://www.hsph.harvard.edu/news/hsph-in-the-news/",
        },
        practices: [
          "Wipe your phone screen daily with a disinfectant wipe",
          "Clean your laptop keyboard and trackpad at least weekly",
          "Disinfect your desk area before studying in shared spaces",
          "Keep disinfectant wipes in your backpack for on-the-go use",
        ],
        doToday:
          "Wipe down your phone and laptop with a disinfectant wipe right now.",
      },
    },
    {
      id: "exposure",
      icon: "ShieldAlert",
      color: "teal",
      name: "Exposure Control",
      badgeValue: displayPct(m.exposure_limit_low_pct),
      badgeLabel: "Low awareness",
      modal: {
        title: "Exposure Control",
        dataText: `${displayPct(m.exposure_limit_low_pct)} of students show low awareness of how to limit exposure to infectious diseases. The CDC explains that infections spread through direct contact, droplets, airborne particles, and contaminated surfaces.`,
        citation: {
          label: "CDC — How Infections Spread",
          url: "https://www.cdc.gov/infection-control/about/index.html",
        },
        practices: [
          "Avoid close contact with people who are visibly sick",
          "Improve ventilation — open windows or use air purifiers",
          "Choose less crowded study spots during flu season",
          "Wear a mask in crowded indoor spaces during outbreaks",
        ],
        doToday:
          "Pick a less crowded study spot for your next study session.",
      },
    },
  ];
}
