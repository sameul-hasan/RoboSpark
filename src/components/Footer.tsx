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
      name: "Department of SWE",
      tier: "DIU SWE Department",
      logoUrl: "/sponsor.png",
      size: "xl",
    },
    {
      name: "Daffodil International University",
      tier: "Daffodil International University",
      logoUrl: "/sponsor1.png",
      size: "lg",
    },
    {
      name: "DIU Robotics Club",
      tier: "DIU Robotics Club",
      logoUrl: "/sponsor2.png",
      size: "lg",
    },
    {
      name: "IntraSpark",
      tier: "Event Partner",
      logoUrl: "/sponsor3.png",
      size: "md",
    },
  ];

  const getSize = (size: string) => {
    switch (size) {
      case "xl":
        return "h-24 sm:h-28 md:h-32"; // biggest
      case "lg":
        return "h-20 sm:h-24 md:h-28";
      case "md":
        return "h-16 sm:h-20 md:h-24";
      default:
        return "h-16";
    }
  };

  return (
    <div
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "linear-gradient(164deg, #302D7F 0%, #1A1843 45%, #010102 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-orbitron font-extrabold text-center mb-14 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-md">
          Official Organizers & Sponsors
        </h2>

        {/* Sponsor List */}
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
          {sponsors.map((sponsor) => (
            <div key={sponsor.name} className="flex flex-col items-center">
              {/* Logo */}
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className={`${getSize(
                  sponsor.size
                )} object-contain  hover:opacity-100 transition-all duration-300`}
              />

              {/* Tier label */}
              <p className="text-gray-300 mt-4 text-base font-semibold text-center">
                {sponsor.tier}
              </p>
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
