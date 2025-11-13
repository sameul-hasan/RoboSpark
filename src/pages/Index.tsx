import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target,
  Trophy,
  Zap,
  Shirt,
  ClipboardCheck,
  Coffee,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.png";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountDown";
import CompetitionCard from "@/components/CompetitionCard";

const Index = () => {
  // --- HIGHLIGHTS (UPDATED, CLEANED) ---
  const highlights = [
    {
      icon: <Target size={32} />,
      title: "5 Competitions",
      description: "Diverse robotics & technology challenges",
    },
    {
      icon: <Trophy size={32} />,
      title: "160,000+ Prize Pool",
      description: "Rewarding innovation & excellence",
    },
    {
      icon: <Zap size={32} />,
      title: "1-Day Grand Event",
      description: "A full day of robotics & innovation",
    },
  ];

  // --- COMPETITIONS ---
  const competitions = [
    {
      title: "Drone Race",
      description: "Navigate autonomous drones through aerial tracks.",
      icon: "🚁",
      prize: "45,000",
      fee: "2,000",
      participants: 40,
    },
    {
      title: "Robo Soccer",
      description: "Build robots to compete in autonomous soccer.",
      icon: "⚽",
      prize: "30,000",
      fee: "1,500",
      participants: 35,
    },
    {
      title: "Line Following Robot",
      description: "High-speed precision robot racing track.",
      icon: "🤖",
      prize: "30,000",
      fee: "1,500",
      participants: 50,
    },
    {
      title: "Techathon",
      description: "36-hour hackathon to develop AI/software innovation.",
      icon: "💻",
      prize: "50,000",
      fee: "2,000",
      participants: 60,
    },
    {
      title: "Cosmo Cleanse",
      description: "Robotic machine to clear simulated debris.",
      icon: "✨",
      prize: "35,000",
      fee: "1,500",
      participants: 30,
    },
  ];

  // --- BENEFITS ---
  const benefits = [
    {
      icon: <Shirt size={32} />,
      title: "Official T-Shirt",
      description: "Exclusive premium event T-shirt for participants",
    },
    {
      icon: <ClipboardCheck size={32} />,
      title: "Certificate",
      description: "Official DIU Robotics Club certificate",
    },
    {
      icon: <Coffee size={32} />,
      title: "Food & Refreshments",
      description: "Lunch + drinks for all participants",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-900 to-black text-white">
      {/* HERO SECTION */}
      <section
        className="min-h-screen text-white bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `
      linear-gradient(180deg, rgba(26,74,255,0.9), rgba(20,37,167,0.85), rgba(0,4,40,0.95)),
      url(${heroBg})
    `,
          backgroundBlendMode: "overlay",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#1B0034]" />

        <div className="relative z-10 container mx-auto px-4 pt-52 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-8xl font-orbitron font-extrabold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                RoboSpark
              </span>{" "}
              2025
            </h1>

            <p className="text-xl md:text-2xl text-indigo-300 mb-10 max-w-3xl mx-auto">
              Igniting Innovation Through Robotics & Technology
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="font-orbitron bg-cyan-500 text-black hover:bg-cyan-400 text-lg px-10"
              >
                <Link to="/register">Register Now</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-orbitron text-lg px-10 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
              >
                <Link to="/competitions">Explore Competitions</Link>
              </Button>
            </div>
          </motion.div>

          {/* COUNTDOWN */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="text-2xl font-orbitron font-bold mb-6 text-cyan-300">
              Event Starts In
            </h2>
            <CountdownTimer />
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 ">
        <div className="container  px-4 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              About RoboSpark
            </h2>

            <p className="text-lg text-gray-200 leading-relaxed">
              RoboSpark 2025 is an inter-university robotics and technology
              competition hosted by DIU Robotics Club. A celebration of
              engineering excellence, creativity, and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold mb-14 text-center bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
            Event Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gray-900/50 p-8 rounded-xl text-center border border-indigo-700/50 hover:shadow-xl hover:shadow-cyan-400/20 transition"
              >
                <div className="text-cyan-300 mb-4 flex justify-center">
                  {h.icon}
                </div>
                <h3 className="text-xl font-orbitron font-bold">{h.title}</h3>
                <p className="text-gray-300 mt-2">{h.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COMPETITIONS */}
      <section className="py-20  backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Featured Challenges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {competitions.slice(0, 5).map((c, index) => (
              <CompetitionCard
                key={index}
                {...c}
                icon={<span className="text-4xl">{c.icon}</span>}
                index={index}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-cyan-500 text-black hover:bg-cyan-400 font-orbitron text-lg px-16"
            >
              <Link to="/competitions">View All Competitions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold mb-12 text-center">
            Participant <span className="text-cyan-400">Benefits</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gray-900/60 p-8 rounded-xl text-center border border-cyan-700/40"
              >
                <div className="text-cyan-400 mb-4 flex justify-center">
                  {b.icon}
                </div>
                <h3 className="text-xl font-orbitron font-bold">{b.title}</h3>
                <p className="text-gray-300 mt-2">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE + DETAILS + SCHEDULE SECTION */}
      <section className="py-20 ">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Title */}
          <h2 className="text-4xl font-orbitron font-bold mb-12 text-center bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
            Event Information
          </h2>

          {/* Venue */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/60 border border-cyan-700/40 rounded-2xl p-8 mb-10"
          >
            <h3 className="text-2xl font-orbitron font-bold text-cyan-400 mb-4">
              Proposed Venue
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Daffodil Smart City, Birulia, Savar, Dhaka – 1216.
            </p>
          </motion.div>

          {/* Event Date + Organizers */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/60 border border-indigo-600/40 rounded-2xl p-8 mb-12"
          >
            <h3 className="text-2xl font-orbitron font-bold text-indigo-400 mb-4">
              RoboSpark 2025 Event Details
            </h3>

            <p className="text-gray-300 text-lg mb-2">
              <span className="font-bold text-cyan-300">Date:</span> 7th
              December, 2025
            </p>

            <p className="text-gray-300 text-lg mb-2">
              <span className="font-bold text-cyan-300">Venue:</span> Daffodil
              Smart City
            </p>

            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              <span className="font-bold text-cyan-300">Organizers:</span>{" "}
              Department of Software Engineering (SWE), Daffodil International
              University · DIU Robotics Lab · DIU Robotics Club
            </p>
          </motion.div>

          {/* Program Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/60 border border-purple-600/40 rounded-2xl p-8"
          >
            <h3 className="text-3xl font-orbitron font-bold text-purple-400 mb-6 text-center">
              Program Schedule
            </h3>

            <p className="text-gray-400 text-center mb-6">
              All times are in Bangladesh Standard Time (GMT +6)
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-gray-300">
                <thead>
                  <tr className="bg-purple-900/40 text-purple-300">
                    <th className="p-3 border-b border-purple-700/50">Sl.</th>
                    <th className="p-3 border-b border-purple-700/50">
                      Purpose
                    </th>
                    <th className="p-3 border-b border-purple-700/50">Time</th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    ["1", "Arrival of All Participants", "8:15 AM"],
                    ["2", "Opening Ceremony", "8:30 AM – 9:00 AM"],
                    ["3", "Breakfast Distribution", "9:00 AM – 9:30 AM"],
                    ["4", "Robo Soccer", "10:00 AM – 1:30 PM"],
                    [
                      "5",
                      "Line Following Robot Competition",
                      "9:30 AM – 1:30 PM",
                    ],
                    ["6", "Techathon", "10:00 AM – 3:00 PM"],
                    ["7", "Drone Race", "10:00 AM – 3:00 PM"],
                    ["8", "Cosmo Cleanse", "9:00 AM – 3:30 PM"],
                    ["9", "Lunch Break", "1:30 PM – 2:15 PM"],
                    ["10", "Closing Ceremony", "4:00 PM – 5:00 PM"],
                  ].map(([sl, purpose, time], index) => (
                    <tr
                      key={index}
                      className="hover:bg-purple-800/20 transition border-b border-gray-700/40"
                    >
                      <td className="p-3">{sl}</td>
                      <td className="p-3">{purpose}</td>
                      <td className="p-3">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-indigo-900/50 border-2 border-indigo-600/40 rounded-3xl p-14 text-center shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-white">
              Ready to{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Compete?
              </span>
            </h2>

            <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
              Register your team now and join the most exciting robotics event
              of 2025!
            </p>

            <Button
              asChild
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-orbitron text-lg px-16"
            >
              <Link to="/register">Register Your Team</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
