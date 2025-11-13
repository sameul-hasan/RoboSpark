import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Eye, Award, Users } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Universities", value: "20+" },
    { label: "Participants", value: "200+" },
    { label: "Competitions", value: "5" },
    { label: "Prize Pool", value: "50K+" },
  ];

  const achievements = [
    "Successfully organized 3 previous robotics competitions",
    "Trained over 500 students in robotics and automation",
    "Winner of National Robotics Championship 2024",
    "Published 15+ research papers in robotics",
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
              About IntraSpark
            </h1>
            <p className="text-xl text-muted-foreground">
              Fostering Innovation and Excellence in Robotics and Technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm rounded-lg p-6 text-center neon-border"
              >
                <div className="text-4xl font-orbitron font-bold text-primary mb-2 text-glow-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-orbitron font-bold mb-6 text-primary">
                Event Overview
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                IntraSpark 2025 is a premier inter-university robotics and technology competition 
                that brings together the brightest minds from across the country. Organized by the 
                DIU Robotics Club at Daffodil International University, this two-day event showcases 
                cutting-edge innovations in robotics, automation, and software development.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With five diverse competitions including Drone Challenge, Line Following Robot, 
                Techathon, Robot Soccer, and Cosmo Cleanse, participants will face exciting 
                challenges that test their technical skills, creativity, and teamwork.
              </p>
            </motion.div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm rounded-lg p-8 neon-border"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="text-primary" size={32} />
                  <h3 className="text-2xl font-orbitron font-bold">Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To create a platform that inspires and nurtures the next generation of 
                  innovators in robotics and technology, fostering a culture of creativity, 
                  collaboration, and excellence.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm rounded-lg p-8 neon-border"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="text-secondary" size={32} />
                  <h3 className="text-2xl font-orbitron font-bold">Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To provide students with hands-on experience in robotics and technology 
                  through competitive challenges, while building a strong community of tech 
                  enthusiasts and promoting innovation.
                </p>
              </motion.div>
            </div>

            {/* About DIU Robotics Club */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-8 neon-border"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Users className="text-primary" size={32} />
                <h2 className="text-3xl font-orbitron font-bold">DIU Robotics Club</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The DIU Robotics Club is a student-led organization at Daffodil International 
                University dedicated to promoting robotics, automation, and technological innovation. 
                Since its inception, the club has been at the forefront of robotics education and 
                competition in Bangladesh.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Award className="text-secondary flex-shrink-0" size={20} />
                  <h4 className="text-lg font-semibold">Key Achievements</h4>
                </div>
                <ul className="space-y-2 ml-8">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Why Participate */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-orbitron font-bold mb-6 text-primary">
                Why Participate?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Network with top tech talent and industry professionals",
                  "Win exciting prizes and recognition",
                  "Gain hands-on experience with cutting-edge technology",
                  "Enhance your problem-solving and teamwork skills",
                  "Showcase your innovations to a wide audience",
                  "Access mentorship from experienced professionals",
                ].map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-muted/30 rounded-lg p-4"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{reason}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
