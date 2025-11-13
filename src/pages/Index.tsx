import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, Target, Users, Trophy } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import CompetitionCard from "@/components/CompetitionCard";
import heroBg from "@/assets/hero-bg.png";

const Index = () => {
  // Set event date (adjust as needed)
  const eventDate = "2025-03-15T09:00:00";

  const highlights = [
    {
      icon: <Target size={32} />,
      title: "5 Competitions",
      description: "Diverse challenges across robotics and technology",
    },
    {
      icon: <Users size={32} />,
      title: "200+ Participants",
      description: "Top talent from universities nationwide",
    },
    {
      icon: <Trophy size={32} />,
      title: "50,000+ Prizes",
      description: "Rewarding innovation and excellence",
    },
    {
      icon: <Zap size={32} />,
      title: "2-Day Event",
      description: "Intense competition and networking",
    },
  ];

  const competitions = [
    {
      title: "Drone Challenge",
      description:
        "Navigate through obstacles and complete mission objectives with your autonomous drone.",
      icon: "🚁",
      participants: 40,
      prize: "15,000",
      fee: "1,000",
    },
    {
      title: "Line Following Robot",
      description:
        "Build a robot that can follow a line track with speed and precision.",
      icon: "🤖",
      participants: 50,
      prize: "12,000",
      fee: "800",
    },
    {
      title: "Techathon",
      description:
        "24-hour hackathon to develop innovative tech solutions for real-world problems.",
      icon: "💻",
      participants: 60,
      prize: "20,000",
      fee: "500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6">
              <span className="gradient-text">IntraSpark</span>{" "}
              <span className="text-primary">2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Igniting Innovation Through Technology & Competition
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-semibold text-lg px-8 glow-border"
              >
                <Link to="/register">Register Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-orbitron font-semibold text-lg px-8"
              >
                <Link to="/competitions">Explore Competitions</Link>
              </Button>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold mb-8 text-primary">
              Event Starts In
            </h2>
            <CountdownTimer targetDate={eventDate} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 gradient-text">
              About IntraSpark
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              IntraSpark 2025 is an inter-university robotics and technology
              competition organized by the DIU Robotics Club. Join us for two
              days of intense competition, innovation, and networking as teams
              from across the country compete in cutting-edge challenges
              spanning robotics, AI, and software development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-12 text-center gradient-text">
            Event Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-card/50 backdrop-blur-sm rounded-lg p-6 text-center neon-border hover:glow-border transition-all duration-300"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-orbitron font-bold mb-2">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-12 text-center gradient-text">
            Featured Competitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {competitions.map((comp, index) => (
              <CompetitionCard
                key={index}
                title={comp.title}
                description={comp.description}
                icon={<span className="text-4xl">{comp.icon}</span>}
                participants={comp.participants}
                prize={comp.prize}
                fee={comp.fee}
                index={index}
              />
            ))}
          </div>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-orbitron font-semibold"
            >
              <Link to="/competitions">View All Competitions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm rounded-2xl p-12 text-center neon-border"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 gradient-text">
              Ready to Compete?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Register your team now and be part of the most exciting robotics
              and technology competition of the year!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-semibold text-lg px-12 glow-border"
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
