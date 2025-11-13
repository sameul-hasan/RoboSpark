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

// Custom styles for neon/cyberpunk look, embedded within the file
const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

    .font-orbitron {
      font-family: 'Orbitron', sans-serif;
    }
    .text-primary-neon {
      color: #8b5cf6; /* Violet/Electric Purple */
    }
    .text-secondary-neon {
      color: #38bdf8; /* Sky Blue/Cyan */
    }
    .gradient-text {
      /* Blended Neon Header Glow */
      background: linear-gradient(90deg, #a78bfa, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 12px rgba(167, 139, 250, 0.7); /* Stronger shadow */
    }
    .neon-card-base {
      /* Dark, translucent container with a subtle neon border glow */
      background: rgba(18, 24, 47, 0.45); 
      backdrop-filter: blur(12px);
      border: 1px solid rgba(139, 92, 246, 0.2);
      box-shadow: 0 0 15px rgba(139, 92, 246, 0.1);
      transition: all 0.3s ease-in-out;
    }
    .neon-card-base:hover {
        border-color: rgba(56, 189, 248, 0.7);
        box-shadow: 0 0 35px rgba(56, 189, 248, 0.3);
        transform: translateY(-5px);
    }
    .neon-border-rules {
        border: 1px solid rgba(139, 92, 246, 0.5);
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
    }
    .pulse-dot {
      animation: pulse-dot 1.5s infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.5; }
    }
  `}</style>
);

// Internal CompetitionCard Component (replaces external import)
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
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="neon-card-base rounded-2xl p-6 flex flex-col h-full"
    >
      <div className="flex items-center space-x-4 mb-4 border-b border-indigo-700/50 pb-4">
        <span className="text-secondary-neon p-3 rounded-xl bg-indigo-900/40 shadow-xl shadow-secondary-neon/10">
          {icon}
        </span>
        <h3 className="text-2xl font-orbitron font-bold text-primary-neon leading-snug">
          {title}
        </h3>
      </div>

      <p className="text-base text-gray-300 flex-grow mb-6">{description}</p>

      <div className="pt-4 border-t border-indigo-700/50 space-y-3">
        {/* Prize */}
        <div className="flex justify-between items-center">
          <span className="flex items-center space-x-2 text-sm text-gray-400">
            <DollarSign size={16} className="text-yellow-400" />
            <span>Prize Pool</span>
          </span>
          <span className="text-lg font-orbitron font-bold text-yellow-300">
            {prize}{" "}
            <span className="text-sm font-inter text-yellow-400/80">BDT</span>
          </span>
        </div>

        {/* Fee */}
        <div className="flex justify-between items-center group relative">
          <span className="flex items-center space-x-2 text-sm text-gray-400">
            <Zap size={16} className="text-red-400" />
            <span>Entry Fee</span>
          </span>

          <span className="text-lg font-orbitron font-bold text-red-300 cursor-pointer">
            {fee}
          </span>

          {/* Tooltip */}
          <div
            className="absolute right-0 top-8 z-20 hidden group-hover:block 
                  bg-gray-900 text-gray-200 text-xs p-3 rounded-lg 
                  border border-cyan-500/30 w-52 shadow-xl"
          >
            {feeDetails}
          </div>
        </div>

        {/* Participants */}
        <div className="flex justify-between items-center">
          <span className="flex items-center space-x-2 text-sm text-gray-400">
            <Users size={16} className="text-green-400" />
            <span>Max Participants</span>
          </span>
          <span className="text-lg font-orbitron font-bold text-green-300">
            {participants}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component (Exported as App for standard React structure)
const App = () => {
  const competitions = [
    {
      title: "Drone Race",
      description:
        "Navigate your autonomous drone through a challenging obstacle course with precision and speed.",
      icon: <Plane size={32} />,
      participants: 6,
      prize: "15,000",
      fee: "2000 BDT + extra",
      feeDetails:
        "Base: 2000 BDT (3 members) | Extra: 600 BDT per member (max 6)",
    },
    {
      title: "Robo Soccer",
      description:
        "Design and build robots to compete in an intense autonomous soccer match.",
      icon: <Gamepad2 size={32} />,
      participants: 6,
      prize: "18,000",
      fee: "1500 BDT + extra",
      feeDetails:
        "Base: 1500 BDT (3 members) | Extra: 500 BDT per member (max 6)",
    },
    {
      title: "Line Following Robot (LFR)",
      description:
        "Build a high-speed robot capable of handling complex tracks with precision.",
      icon: <Activity size={32} />,
      participants: 6,
      prize: "12,000",
      fee: "1500 BDT + extra",
      feeDetails:
        "Base: 1500 BDT (3 members) | Extra: 500 BDT per member (max 6)",
    },
    {
      title: "Techathon",
      description:
        "A powerful hackathon challenge where teams build innovative software solutions.",
      icon: <Code size={32} />,
      participants: 6,
      prize: "20,000",
      fee: "2000 BDT + extra",
      feeDetails:
        "Base: 2000 BDT (3 members) | Extra: 600 BDT per member (max 6)",
    },
    {
      title: "Cosmo Cleanse",
      description:
        "Build an efficient robotic solution capable of cleaning and sorting debris.",
      icon: <Droplet size={32} />,
      participants: 6,
      prize: "10,000",
      fee: "1500 BDT + extra",
      feeDetails:
        "Base: 1500 BDT (3 members) | Extra: 500 BDT per member (max 6)",
    },
  ];

  // Rules Data
  const generalRules = [
    "Each team must consist of 2-3 members from the same institution.",
    "Teams can participate in multiple competitions with separate registrations.",
    "All robots and projects must be built by team members; no pre-built kits allowed.",
    "Registration fees are non-refundable once payment is confirmed.",
    "Detailed competition rules will be provided to registered teams via email.",
    "Judges' decisions are final and binding in all competitions.",
  ];

  return (
    <>
      <CustomStyles />
      <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-950 via-indigo-900 to-black text-white p-4 md:p-8 font-inter">
        {/* Hero Section */}
        <section className="pt-16 pb-12 md:pt-28 md:pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-6xl md:text-8xl font-orbitron font-extrabold mb-6 gradient-text uppercase">
                Competitions
              </h1>
              <p className="text-xl md:text-2xl text-indigo-300 font-light tracking-wide">
                Engage with **five exciting challenges** to test your skills in
                robotics, AI, and software development.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Competitions Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {competitions.map((comp, index) => (
                <CompetitionCard
                  key={index}
                  title={comp.title}
                  description={comp.description}
                  icon={comp.icon}
                  participants={comp.participants}
                  prize={comp.prize}
                  feeDetails={comp.feeDetails}
                  fee={comp.fee}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Rules & Guidelines Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-8 text-center text-secondary-neon tracking-wider">
                // General_Rules_Manifest
              </h2>
              <div className="neon-card-base neon-border-rules rounded-xl p-6 md:p-10 space-y-4 shadow-2xl">
                {generalRules.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-3 h-3 rounded-full bg-primary-neon mt-2 flex-shrink-0 pulse-dot" />
                    <p className="text-base text-gray-200 leading-relaxed font-light">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
