import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CompetitionCard from "@/components/CompetitionCard";
import { Plane, Activity, Code, Droplet, Gamepad2 } from "lucide-react";

const Competitions = () => {
  const competitions = [
    {
      title: "Drone Challenge",
      description:
        "Navigate your autonomous drone through a challenging obstacle course. Complete mission objectives including target detection, precision landing, and time-based challenges. Test your piloting skills and programming prowess!",
      icon: <Plane size={32} />,
      participants: 40,
      prize: "15,000",
      fee: "1,000",
    },
    {
      title: "Line Following Robot (LFR)",
      description:
        "Build and program a robot capable of following a complex line track at high speed. The fastest robot with the most accurate line-following wins. Demonstrate your expertise in sensors, motor control, and optimization.",
      icon: <Activity size={32} />,
      participants: 50,
      prize: "12,000",
      fee: "800",
    },
    {
      title: "Techathon",
      description:
        "A 24-hour hackathon where teams develop innovative software solutions for real-world problems. From web apps to mobile applications, showcase your coding skills and creativity. Best idea and implementation wins!",
      icon: <Code size={32} />,
      participants: 60,
      prize: "20,000",
      fee: "500",
    },
    {
      title: "Robot Soccer",
      description:
        "Design autonomous robots to play soccer against other teams. Strategy, teamwork, and precise engineering are key to victory. Watch your robots compete in an exciting tournament-style competition!",
      icon: <Gamepad2 size={32} />,
      participants: 32,
      prize: "18,000",
      fee: "1,200",
    },
    {
      title: "Cosmo Cleanse",
      description:
        "Create robots capable of collecting and sorting waste materials in a simulated environment. Focus on sustainability and automation. The most efficient and innovative cleaning robot wins!",
      icon: <Droplet size={32} />,
      participants: 35,
      prize: "10,000",
      fee: "700",
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6 gradient-text">
              Competitions
            </h1>
            <p className="text-xl text-muted-foreground">
              Five exciting challenges to test your skills in robotics, AI, and software development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Competitions Grid */}
      <section className="py-20">
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
                fee={comp.fee}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Rules & Guidelines Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-orbitron font-bold mb-8 text-center gradient-text">
              General Rules & Guidelines
            </h2>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 neon-border space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Each team must consist of 2-3 members from the same institution
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Teams can participate in multiple competitions with separate registrations
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  All robots and projects must be built by team members; no pre-built kits allowed
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Registration fees are non-refundable once payment is confirmed
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Detailed competition rules will be provided to registered teams via email
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Judges' decisions are final and binding in all competitions
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Competitions;
