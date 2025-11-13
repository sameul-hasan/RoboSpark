import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, DollarSign, Award } from "lucide-react";

/**
 * Fully responsive version of your page.
 * - Keeps your neon / glass look
 * - Improves breakpoints, spacing, and grid behavior
 * - Prevents horizontal scroll and overflow on small screens
 */

const CustomStyles = () => (
  <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap");

    .font-orbitron { font-family: "Orbitron", sans-serif; }
    .gradient-text {
      background: linear-gradient(90deg, #a78bfa, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .text-primary-neon { color: #8b5cf6; }
    .text-secondary-neon { color: #38bdf8; }

    .neon-card {
      background: rgba(18,24,47,0.45);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(139,92,246,0.45);
      box-shadow: 0 6px 30px rgba(139,92,246,0.06);
      transition: transform .28s ease, box-shadow .28s ease;
    }
    .neon-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(139,92,246,0.12);
    }

    .pulse-dot { animation: pulse-dot 1.5s infinite; }
    @keyframes pulse-dot {
      0%,100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.45); opacity: 0.55; }
    }

    /* Small helper to avoid layout shift on huge font sizes */
    .no-break {
      word-break: keep-all;
      overflow-wrap: normal;
    }
  `}</style>
);

const App: React.FC = () => {
  // Data
  const competitionFees = [
    { name: "Drone Race", team: "3 Person", fee: "2000 BDT" },
    { name: "Robo Soccer", team: "3 Person", fee: "1500 BDT" },
    { name: "Line Following Robot", team: "3 Person", fee: "1500 BDT" },
    { name: "Techathon", team: "3 Person", fee: "2000 BDT" },
    { name: "Cosmo Cleanse", team: "3 Person", fee: "1500 BDT" },
  ];

  const stats = [
    {
      value: "5",
      label: "Competitions",
      icon: Award,
      color: "text-primary-neon",
      borderColor: "border-primary-neon",
    },
    {
      value: "160K+",
      label: "Prize Pool",
      icon: DollarSign,
      color: "text-yellow-400",
      borderColor: "border-yellow-400",
    },
  ];

  const eventOverview =
    "IntraSpark 2025 is a premier inter-university robotics and technology competition that brings together the brightest minds from across the country. Organized by the DIU Robotics Club at Daffodil International University, this two-day event showcases cutting-edge innovations in robotics, automation, and software development.";

  const eventChallenges =
    "With five diverse competitions including Drone Challenge, Line Following Robot, Techathon, Robot Soccer, and Cosmo Cleanse, participants will face exciting challenges that test their technical skills, creativity, and teamwork.";

  const visionText =
    "To create a platform that inspires and nurtures the next generation of innovators in robotics and technology, fostering a culture of creativity, collaboration, and excellence.";

  const missionText =
    "To provide students with hands-on experience in robotics and technology through competitive challenges, while building a strong community of tech enthusiasts and promoting innovation.";

  const clubText =
    "The DIU Robotics Club is a student-led organization at Daffodil International University dedicated to promoting robotics, automation, and technological innovation. Since its inception, the club has been at the forefront of robotics education and competition in Bangladesh.";

  const keyAchievements = [
    "Successfully organized 3 previous robotics competitions",
    "Trained over 500 students in robotics and automation",
    "Winner of National Robotics Championship 2024",
    "Published 15+ research papers in robotics",
  ];

  const benefitsList = [
    "Network with top tech talent and industry professionals",
    "Win exciting prizes and recognition",
    "Gain hands-on experience with cutting-edge technology",
    "Enhance your problem-solving and teamwork skills",
    "Showcase your innovations to a wide audience",
    "Access mentorship from experienced professionals",
  ];

  // Stat card helper
  const StatCard: React.FC<{
    value: string;
    label: string;
    Icon: any;
    color: string;
    borderColor: string;
    index: number;
  }> = ({ value, label, Icon, color, borderColor, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.08 }}
      className={`neon-card border ${borderColor}/40 rounded-xl p-5 sm:p-6 w-full max-w-xs mx-auto flex flex-col items-center text-center`}
    >
      <Icon className={color} size={44} />
      <div className={`font-orbitron font-extrabold mt-3 ${color} text-3xl sm:text-4xl`}>{value}</div>
      <div className="text-xs sm:text-sm text-gray-400 mt-1 tracking-wider">{label}</div>
    </motion.div>
  );

  return (
    <>
      <CustomStyles />

      {/* Top-level: prevent horizontal overflow */}
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-950 via-indigo-900 to-black text-white antialiased">
        {/* Safe container spacing */}
        <div className="px-4 sm:px-6 lg:px-8 pt-32">

          {/* HERO */}
          <header className="pt-20 pb-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-orbitron gradient-text uppercase no-break text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
              >
                IntraSpark
              </motion.h1>

              <p className="mt-4 inline-block text-indigo-300 text-sm sm:text-base md:text-lg border-t border-b border-indigo-500/30 py-2 px-4">
                Fostering Innovation and Excellence in Robotics and Technology
              </p>
            </div>
          </header>

          {/* STATS: centered and responsive */}
          <section className="pb-12">
            <div className="max-w-4xl mx-auto">
              {/* grid: 1 col mobile, 2 cols sm+, center */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 place-items-center">
                {stats.map((s, i) => (
                  <StatCard
                    key={i}
                    value={s.value}
                    label={s.label}
                    Icon={s.icon}
                    color={s.color}
                    borderColor={s.borderColor}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* MAIN CONTENT */}
          <main className="max-w-4xl mx-auto pb-20 space-y-10">

            {/* Overview */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="neon-card rounded-2xl p-5 sm:p-8"
              >
                <h2 className="text-primary-neon text-2xl sm:text-3xl font-orbitron font-bold mb-3">
                  // Event_Overview
                </h2>
                <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">{eventOverview}</p>
                <p className="text-indigo-300 font-semibold mt-4 text-sm sm:text-base">{eventChallenges}</p>
              </motion.div>
            </section>

            {/* Vision & Mission - stack on mobile, two columns on md */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div className="neon-card rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="text-secondary-neon" size={36} />
                  <h3 className="text-lg sm:text-xl font-orbitron font-bold text-secondary-neon">// Vision.Set</h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{visionText}</p>
              </motion.div>

              <motion.div className="neon-card rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="text-primary-neon" size={36} />
                  <h3 className="text-lg sm:text-xl font-orbitron font-bold text-primary-neon">// Mission.Execute</h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{missionText}</p>
              </motion.div>
            </section>

            {/* Club Info & Achievements */}
            <section>
              <motion.div className="neon-card rounded-2xl p-5 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-orbitron text-secondary-neon mb-3">// DIU_Robotics_Club</h3>
                <p className="text-indigo-200 leading-relaxed text-sm sm:text-base border-l-4 border-secondary-neon pl-3 mb-6">{clubText}</p>

                <h4 className="text-primary-neon font-orbitron text-xl mb-3">/ Key_Achievements</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-200 text-sm">
                  {keyAchievements.map((k, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary-neon mt-0.5">▸</span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </section>

            {/* Entry Fees Matrix */}
            <section>
              <motion.div className="neon-card rounded-xl p-4 sm:p-6">
                <h4 className="text-primary-neon text-xl font-orbitron mb-4">// Entry_Fees_Matrix</h4>
                <div className="space-y-2">
                  {competitionFees.map((c, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 p-2 sm:p-3 border-b border-indigo-700/40 last:border-b-0">
                      <div className="text-indigo-300 font-semibold">{c.name}</div>
                      <div className="flex items-center gap-3 mt-1 sm:mt-0">
                        <span className="text-sm text-gray-400 hidden sm:inline">Team Size: {c.team}</span>
                        <span className="font-bold text-primary-neon">{c.fee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Why Participate - responsive grid */}
            <section>
              <h4 className="text-secondary-neon text-2xl font-orbitron text-center mb-6">// Why_Participate</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {benefitsList.map((b, i) => (
                  <motion.div
                    key={i}
                    className="bg-gray-800/60 border border-secondary-neon/20 p-4 rounded-lg flex gap-3 items-start"
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-secondary-neon mt-1 pulse-dot flex-shrink-0" />
                    <p className="text-sm text-gray-100 leading-relaxed">{b}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
