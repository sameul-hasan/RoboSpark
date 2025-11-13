import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

const Link = (props) => (
  <a
    href={props.to}
    className={props.className}
    onClick={(e) => {
      e.preventDefault();
      console.log(`Navigating to: ${props.to}`);
    }}
  >
    {props.children}
  </a>
);

const SponsorSection = () => {
  const sponsors = [
    {
      name: "Quantum Solutions",
      tier: "Title Sponsor",
      logoUrl: "/sponsor1.png",
      size: "large",
      ring: "from-cyan-400 to-blue-500",
    },
    {
      name: "Cyber Guard",
      tier: "Gold Sponsor",
      logoUrl: "/sponsor2.png",
      size: "medium",
      ring: "from-amber-400 to-orange-500",
    },
    {
      name: "RoboFuture",
      tier: "Silver Sponsor",
      logoUrl: "/sponsor3.png",
      size: "small",
      ring: "from-purple-400 to-pink-500",
    },
  ];

  const getSize = (size: string) => {
    switch (size) {
      case "large":
        return "h-16 sm:h-20";
      case "medium":
        return "h-12 sm:h-16";
      case "small":
        return "h-10 sm:h-14";
      default:
        return "h-12";
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-transparent to-black/20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl font-extrabold text-center mb-14 font-inter 
        text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
        >
          Our Sponsors
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-10">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="
                p-[2px] rounded-2xl 
                bg-gradient-to-br shadow-lg shadow-black/40
                hover:shadow-cyan-500/20 transition-all duration-300
              "
              style={{
                backgroundImage: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
              }}
            >
              <div
                className="
                  bg-gray-900/70 backdrop-blur-xl 
                  rounded-2xl px-6 py-4 flex items-center justify-center
                  border border-white/5 hover:border-cyan-400/30 
                  transition-all duration-300
                "
              >
                <img
                  src={sponsor.logoUrl}
                  alt={`${sponsor.name} Logo`}
                  className={`${getSize(
                    sponsor.size
                  )} object-contain opacity-70 hover:opacity-100 transition-all duration-300`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const GradientText = ({ children, className }) => (
    <span
      className={`font-bold font-inter ${className}`}
      style={{
        background: "linear-gradient(90deg, #818CF8, #C084FC)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );

  const quickLinks = [
    { name: "Home", path: "#/" },
    { name: "About", path: "/about" },
    { name: "Competitions", path: "/competitions" },
    { name: "Register", path: "/register" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="b border-t  bg-gradient-to-br from-black via-gray-900 to-blue-950 p-6 border-gray-700/50 text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <GradientText className="font-orbitron">
                IntraSpark 2025
              </GradientText>
            </h3>
            <p className="text-gray-400 mb-4">
              Igniting Innovation Through Technology & Competition
            </p>
            <p className="text-sm text-gray-500">
              Organized by DIU Robotics Club
              <br />
              Daffodil International University
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-indigo-400 mb-4 font-inter">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-indigo-400 mb-4 font-inter">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-gray-400">
                <Mail
                  size={18}
                  className="text-indigo-400 flex-shrink-0 mt-1"
                />
                <span>roboticsclub@diu.edu.bd</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-400">
                <Phone
                  size={18}
                  className="text-indigo-400 flex-shrink-0 mt-1"
                />
                <span>+880 1234-567890</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700/50 text-gray-300 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>
            © {currentYear} IntraSpark. All rights reserved. | DIU Robotics Club
          </p>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="flex flex-col font-inter">
      <SponsorSection />
      <Footer />
    </div>
  );
};

export default App;
