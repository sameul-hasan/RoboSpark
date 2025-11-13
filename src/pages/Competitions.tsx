import React from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Activity,
  Code,
  Droplet,
  Gamepad2,
  Users,
  DollarSign,
  Zap,
} from "lucide-react";

// Custom styles for neon/cyberpunk look
const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

    .font-orbitron {
      font-family: 'Orbitron', sans-serif;
    }

    .gradient-text {
      background: linear-gradient(90deg, #a78bfa, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 10px rgba(167, 139, 250, 0.5);
    }

    .neon-card-base {
      background: rgba(18, 24, 47, 0.45);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(139, 92, 246, 0.2);
      transition: 0.3s ease;
    }
    .neon-card-base:hover {
      border-color: rgba(56, 189, 248, 0.8);
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.3);
      transform: translateY(-4px);
    }

    /* Prevent tooltip overflow on mobile */
    @media (max-width: 768px) {
      .fee-tooltip {
        display: none !important;
      }
    }
  `}</style>
);

// Fully mobile-responsive competition card
const CompetitionCard = ({
  title,
  description,
  feeDetails,
  icon,
  participants,
  prize,
  fee,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="neon-card-base rounded-2xl p-5 sm:p-6 flex flex-col w-full"
    >
      <div className="flex items-center space-x-4 mb-4 border-b border-indigo-700/40 pb-4">
        <span className="text-cyan-400 p-3 rounded-xl bg-indigo-900/40">
          {icon}
        </span>
        <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-purple-300">
          {title}
        </h3>
      </div>

      <p className="text-sm sm:text-base text-gray-300 mb-6">{description}</p>

      <div className="pt-4 border-t border-indigo-700/40 space-y-4">
        {/* Prize */}
        <div className="flex justify-between">
          <span className="text-sm text-gray-400 flex items-center gap-2">
            <DollarSign size={16} className="text-yellow-400" /> Prize Pool
          </span>
          <span className="text-lg font-bold text-yellow-300">{prize} BDT</span>
        </div>

        {/* Fee */}
        <div className="relative flex justify-between group">
          <span className="text-sm text-gray-400 flex items-center gap-2">
            <Zap size={16} className="text-red-400" /> Entry Fee
          </span>
          <span className="font-bold text-red-300 cursor-pointer">{fee}</span>

          <div className="fee-tooltip absolute right-0 top-8 hidden group-hover:block bg-gray-900 p-3 text-xs rounded-lg border border-cyan-500/40 w-52 z-50">
            {feeDetails}
          </div>
        </div>

        {/* Participants */}
        <div className="flex justify-between">
          <span className="text-sm text-gray-400 flex items-center gap-2">
            <Users size={16} className="text-green-400" /> Max Team Size
          </span>
          <span className="font-bold text-green-300">{participants}</span>
        </div>
      </div>
    </motion.div>
  );
};

const App = () => {
  const competitions = [
    {
      title: "Drone Race",
      description:
        "Navigate an autonomous drone through a competitive obstacle course.",
      icon: <Plane size={28} />,
      participants: 6,
      prize: "15,000",
      fee: "2000 BDT + extra",
      feeDetails: "Base: 2000 BDT (3 members) | Extra: 600 per extra member",
    },
    {
      title: "Robo Soccer",
      description:
        "Build robots to compete in a high-intensity soccer challenge.",
      icon: <Gamepad2 size={28} />,
      participants: 6,
      prize: "18,000",
      fee: "1500 BDT + extra",
      feeDetails: "Base: 1500 BDT | Extra: 500 per extra member",
    },
    {
      title: "Line Following Robot (LFR)",
      description: "Build a fast and precise robot to follow complex tracks.",
      icon: <Activity size={28} />,
      participants: 6,
      prize: "12,000",
      fee: "1500 BDT + extra",
      feeDetails: "Base: 1500 BDT | Extra: 500 per extra member",
    },
    {
      title: "Techathon",
      description: "A powerful hackathon-style competition for innovation.",
      icon: <Code size={28} />,
      participants: 6,
      prize: "20,000",
      fee: "2000 BDT + extra",
      feeDetails: "Base: 2000 BDT | Extra: 600 per extra member",
    },
    {
      title: "Cosmo Cleanse",
      description:
        "Develop a robot that can clean and sort environmental debris.",
      icon: <Droplet size={28} />,
      participants: 6,
      prize: "10,000",
      fee: "1500 BDT + extra",
      feeDetails: "Base: 1500 BDT | Extra: 500 per extra member",
    },
  ];

  const rules = [
    "Each team can have up to 6 members.",
    "Teams must register separately for each competition.",
    "Robots must be built by team members; prebuilt kits are not allowed.",
    "Fees are non-refundable once submitted.",
    "Rulebook will be provided after registration.",
  ];

  return (
    <>
      <CustomStyles />

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-900 to-black text-white p-4 sm:p-6 md:p-8">

        {/* HERO */}
        <section className="text-center max-w-3xl mx-auto pt-32 sm:pt-16 container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-7xl font-orbitron font-extrabold gradient-text uppercase leading-tight"
          >
            Competitions
          </motion.h1>

          <p className="text-indigo-300 text-base sm:text-lg md:text-xl mt-4">
            Explore 5 exciting challenges in robotics, AI, and innovation.
          </p>
        </section>

        {/* COMPETITION GRID */}
        <section className="mt-10 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {competitions.map((c, i) => (
              <CompetitionCard key={i} index={i} {...c} />
            ))}
          </div>
        </section>

        {/* RULES SECTION */}
        <section className="mt-14 sm:mt-20 max-w-3xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl font-orbitron text-cyan-300 mb-6">
            General Rules
          </h2>

          <div className="neon-card-base rounded-xl p-5 sm:p-7 space-y-4">
            {rules.map((r, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full mt-1"></div>
                <p className="text-sm sm:text-base text-gray-200">{r}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
