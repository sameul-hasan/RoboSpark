import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, DollarSign, Award, Users, Globe } from "lucide-react";

const CustomStyles = () => (
  <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap");

    .font-orbitron {
      font-family: "Orbitron", sans-serif;
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
    .text-glow-primary {
      text-shadow: 0 0 8px #8b5cf6, 0 0 20px rgba(139, 92, 246, 0.9);
    }
    .neon-card {
      /* Dark, translucent container with a subtle neon border glow */
      background: rgba(18, 24, 47, 0.45);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(139, 92, 246, 0.5);
      box-shadow: 0 0 25px rgba(139, 92, 246, 0.2);
      transition: all 0.4s ease-in-out;
    }
    .neon-card:hover {
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.4),
        0 0 15px rgba(56, 189, 248, 0.3);
      transform: translateY(-5px);
    }
    .pulse-dot {
      animation: pulse-dot 1.5s infinite;
    }
    @keyframes pulse-dot {
      0%,
      100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.5);
        opacity: 0.5;
      }
    }
  `}</style>
);

const App = () => {
  // Data structure for the competition fees
  const competitionFees = [
    { name: "Drone Race", team: "3 Person", fee: "2000 BDT" },
    { name: "Robo Soccer", team: "3 Person", fee: "1500 BDT" },
    { name: "Line Following Robot", team: "3 Person", fee: "1500 BDT" },
    { name: "Techathon", team: "3 Person", fee: "2000 BDT" },
    { name: "Cosmo Cleanse", team: "3 Person", fee: "1500 BDT" },
  ];

  // New statistical data
  const stats = [
    {
      value: "5",
      label: "Competitions",
      icon: Award,
      color: "text-primary-neon",
      borderColor: "border-primary-neon",
    },
    {
      value: "60K+",
      label: "Prize Pool",
      icon: DollarSign,
      color: "text-yellow-400",
      borderColor: "border-yellow-400",
    },
  ];

  // New text content
  const eventOverview = `IntraSpark 2025 is a premier inter-university robotics and technology competition that brings together the brightest minds from across the country. Organized by the DIU Robotics Club at Daffodil International University, this two-day event showcases cutting-edge innovations in robotics, automation, and software development.`;

  const eventChallenges = `With five diverse competitions including Drone Challenge, Line Following Robot, Techathon, Robot Soccer, and Cosmo Cleanse, participants will face exciting challenges that test their technical skills, creativity, and teamwork.`;

  const visionText = `To create a platform that inspires and nurtures the next generation of innovators in robotics and technology, fostering a culture of creativity, collaboration, and excellence.`;

  const missionText = `To provide students with hands-on experience in robotics and technology through competitive challenges, while building a strong community of tech enthusiasts and promoting innovation.`;

  const clubText = `The DIU Robotics Club is a student-led organization at Daffodil International University dedicated to promoting robotics, automation, and technological innovation. Since its inception, the club has been at the forefront of robotics education and competition in Bangladesh.`;

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

  // Helper component for the Stat Cards
  const StatCard = ({ value, label, Icon, color, borderColor, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.1 }}
      className={`neon-card rounded-xl p-6 self-center shadow-xl flex flex-col justify-center items-center text-center bg-gray-900/60 border ${borderColor}/60 hover:shadow-2xl hover:shadow-indigo-500/20`}
    >
      <Icon className={color} size={50} strokeWidth={1.5} />
      <div
        className={`text-4xl md:text-5xl font-orbitron font-extrabold ${color} mt-3 text-shadow-lg`}
      >
        {value}
      </div>
      <p className="text-sm text-gray-400 mt-1 font-semibold">
        {label.toUpperCase()}
      </p>
    </motion.div>
  );

  return (
    <>
      <CustomStyles />

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-900 to-black text-white p-4 md:p-8 font-inter">
        {/* Hero Section - Centered and Adjusted Padding */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="container mx-auto px-2 md:px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-5xl mx-auto"
            >
              <h1 className="text-6xl md:text-8xl font-orbitron font-extrabold mb-6 gradient-text uppercase">
                IntraSpark
              </h1>
              <h2 className="text-xl md:text-3xl text-indigo-300 font-light tracking-widest border-t border-b border-indigo-500/30 py-3 inline-block px-8">
                Fostering Innovation and Excellence in Robotics and Technology
              </h2>
            </motion.div>
          </div>
        </section>

        {/* --- 4-Stat Matrix --- */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-2 md:px-4">
            <div className="max-w-4xl self-center items-center justify-center mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  Icon={stat.icon}
                  color={stat.color}
                  borderColor={stat.borderColor}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-2 md:px-4">
            <div className="max-w-4xl mx-auto space-y-16">
              {/* Overview Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="neon-card rounded-2xl p-6 md:p-14 shadow-2xl"
              >
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-8 text-primary-neon text-glow-primary tracking-wider border-b border-indigo-500/40 pb-3">
                  // Event_Overview
                </h2>
                <p className="text-lg text-indigo-200 leading-relaxed mb-6">
                  {eventOverview}
                </p>
                <p className="text-lg text-indigo-300 leading-relaxed font-semibold">
                  {eventChallenges}
                </p>
              </motion.div>

              {/* Vision & Mission Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="neon-card rounded-xl p-8 shadow-xl hover:scale-[1.03]"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <Eye
                      className="text-secondary-neon"
                      size={40}
                      strokeWidth={1.5}
                    />
                    <h3 className="text-2xl font-orbitron font-bold text-secondary-neon">
                      // Vision.Set
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-base">
                    {visionText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="neon-card rounded-xl p-8 shadow-xl hover:scale-[1.03]"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <Target
                      className="text-primary-neon"
                      size={40}
                      strokeWidth={1.5}
                    />
                    <h3 className="text-2xl font-orbitron font-bold text-primary-neon">
                      // Mission.Execute
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-base">
                    {missionText}
                  </p>
                </motion.div>
              </div>

              {/* DIU Robotics Club & Key Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="neon-card rounded-2xl p-6 md:p-14 shadow-2xl"
              >
                <h2 className="text-3xl font-orbitron font-bold mb-8 text-secondary-neon text-glow-primary tracking-wider border-b border-indigo-500/40 pb-3">
                  // DIU_Robotics_Club
                </h2>
                <p className="text-lg text-indigo-200 leading-relaxed mb-10 border-l-4 border-secondary-neon pl-4">
                  {clubText}
                </p>

                <h3 className="text-2xl font-orbitron font-bold mb-6 text-primary-neon">
                  / Key_Achievements
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {keyAchievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 text-base text-gray-200"
                    >
                      <span className="text-primary-neon font-extrabold flex-shrink-0 mt-1">
                        &#x25B8;
                      </span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Competition Details (Fees) List Card (Moved to standalone section) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="neon-card rounded-xl p-6 md:p-8 shadow-xl"
              >
                <h3 className="text-2xl font-orbitron font-bold mb-6 text-primary-neon">
                  // Entry_Fees_Matrix
                </h3>
                <div className="space-y-3">
                  {competitionFees.map((comp, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between p-3 border-b border-indigo-700/50 last:border-b-0"
                    >
                      <span className="font-semibold text-indigo-300 text-base">
                        {comp.name}
                      </span>
                      <div className="text-right space-x-4 flex items-center justify-end">
                        <span className="text-sm text-gray-400 hidden sm:inline">
                          Team Size: {comp.team}
                        </span>
                        <span className="font-bold text-primary-neon text-lg">
                          {comp.fee}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Why Participate (List) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="pt-8"
              >
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-8 text-secondary-neon text-glow-primary tracking-wider text-center">
                  // Why_Participate
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {benefitsList.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ delay: index * 0.08 }}
                      className="bg-gray-800/60 border border-secondary-neon/30 p-5 rounded-lg flex items-start space-x-4 transition duration-300 hover:border-secondary-neon"
                    >
                      <div className="w-4 h-4 rounded-full bg-secondary-neon shadow-lg shadow-secondary-neon/50 mt-1 flex-shrink-0 pulse-dot" />
                      <p className="text-sm text-gray-100 leading-relaxed">
                        {reason}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
