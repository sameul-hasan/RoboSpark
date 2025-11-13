import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Loader2,
} from "lucide-react";

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
        text-shadow: 0 0 15px rgba(167, 139, 250, 0.7);
      }
      .neon-card-base {
        /* Dark, translucent container with blur */
        background: rgba(18, 24, 47, 0.45); 
        backdrop-filter: blur(10px);
        border: 1px solid rgba(139, 92, 246, 0.2);
        box-shadow: 0 0 15px rgba(139, 92, 246, 0.1);
      }
      .neon-border {
        box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
      }
      .hover\\:glow-border:hover {
        border-color: rgba(56, 189, 248, 0.7);
        box-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
      }
      /* Mock Input/Textarea Styles */
      .neon-input {
        background-color: rgba(30, 41, 59, 0.6);
        border: 1px solid #4f46e5;
        color: #e5e7eb;
        transition: border-color 0.3s, box-shadow 0.3s;
      }
      .neon-input:focus {
        outline: none;
        border-color: #38bdf8;
        box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.5);
      }
    `}</style>
);

// Mock Input component (replaces @/components/ui/input)
const NeonInput = (props) => (
  <input
    {...props}
    className={`w-full p-3 rounded-lg neon-input mt-1 ${props.className}`}
  />
);

// Mock Textarea component (replaces @/components/ui/textarea)
const NeonTextarea = (props) => (
  <textarea
    {...props}
    className={`w-full p-3 rounded-lg neon-input mt-1 ${props.className}`}
  />
);

// Mock Label component (replaces @/components/ui/label)
const NeonLabel = (props) => (
  <label
    {...props}
    className={`block text-sm font-medium mb-1 text-indigo-300 ${props.className}`}
  />
);

// Mock Button component (replaces @/components/ui/button)
const NeonButton = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`
            p-3 rounded-lg font-orbitron font-semibold transition-all duration-300 
            flex items-center justify-center space-x-2
            bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800
            shadow-lg shadow-indigo-500/50 hover:shadow-indigo-400/70
            disabled:opacity-50 disabled:shadow-none ${className}
        `}
  >
    {children}
  </button>
);


const ToastContainer = ({ message, type }) => {
  if (!message) return null;

  const baseStyle =
    "fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-2xl z-50 max-w-sm w-full text-center font-semibold transition-all duration-300";
  const successStyle = "bg-green-600 text-white shadow-green-500/50";
  const errorStyle = "bg-red-600 text-white shadow-red-500/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`${baseStyle} ${
        type === "success" ? successStyle : errorStyle
      }`}
    >
      {message}
    </motion.div>
  );
};


const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Custom toast mock function
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000); 
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      showNotification("Error: Please fill in all fields.", "error");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification("Error: Please enter a valid email address.", "error");
      setIsSubmitting(false);
      return;
    }

    // Simulate submission
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      showNotification(
        "Message sent successfully! We'll get back to you soon.",
        "success"
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setIsSubmitting(false);
    }, 1500);
  };

  // Changed titles to match the Cyberpunk theme
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Transmission Link",
      content: "roboticsclub@diu.edu.bd",
      href: "mailto:roboticsclub@diu.edu.bd",
    },
    {
      icon: <Phone size={24} />,
      title: "Direct Comm",
      content: "+880 1234-567890",
      href: "tel:+8801234567890",
    },
    {
      icon: <MapPin size={24} />,
      title: "Coordinates",
      content: "Daffodil International University, Dhaka",
      href: "https://maps.google.com/maps?q=Daffodil+International+University+Dhaka",
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook size={24} />,
      label: "Facebook Nexus",
      href: "https://facebook.com",
    },
    {
      icon: <Instagram size={24} />,
      label: "Instagram Feed",
      href: "https://instagram.com",
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn Grid",
      href: "https://linkedin.com",
    },
    {
      icon: <Youtube size={24} />,
      label: "YouTube Archive",
      href: "https://youtube.com",
    },
  ];

  return (
    <>
      <CustomStyles />
      <div className="min-h-screen font-inter bg-gradient-to-br from-gray-950 via-indigo-900 to-black text-gray-100 pb-16">
        <ToastContainer
          message={notification.message}
          type={notification.type}
        />

        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-6xl md:text-8xl font-orbitron font-extrabold mb-4 gradient-text uppercase">
                Contact 
              </h1>
              <p className="text-xl md:text-2xl text-indigo-300 font-light tracking-wide">
                Establish direct link with the IntraSpark Command Center
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {/* Added sm:grid-cols-2 for tablet view */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  className="neon-card-base rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:glow-border"
                >
                  <div className="text-secondary-neon mb-4 flex justify-center">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-orbitron font-bold mb-2 text-primary-neon">
                    {info.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base break-words">
                    {info.content}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Map/Social Links */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-8 gradient-text">
                  Initiate Secure Transmission
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="neon-card-base rounded-xl p-6 md:p-8 space-y-6 neon-border"
                >
                  <div>
                    <NeonLabel htmlFor="name">
                      Your Name / Designation
                    </NeonLabel>
                    <NeonInput
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Input your identifier"
                      required
                    />
                  </div>

                  <div>
                    <NeonLabel htmlFor="email">
                      Encrypted Email Address
                    </NeonLabel>
                    <NeonInput
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.nexus@domain.com"
                      required
                    />
                  </div>

                  <div>
                    <NeonLabel htmlFor="message">
                      Message Payload (Max 500 characters)
                    </NeonLabel>
                    <NeonTextarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Transmit your message here..."
                      maxLength={500}
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <NeonButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-lg shadow-indigo-500/80 hover:shadow-indigo-400/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />{" "}
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send size={20} /> Send Message
                      </>
                    )}
                  </NeonButton>
                </form>
              </motion.div>

              {/* Map, Social Links, and Hours (Info Block) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-8"
              >
                {/* Map */}
                <div className="pt-2">
                  <h2 className="text-3xl font-orbitron font-bold mb-4 text-secondary-neon">
                    Locate Nexus Point
                  </h2>
                  <div className="neon-card-base rounded-xl overflow-hidden neon-border h-[280px] w-full shadow-2xl shadow-indigo-900/50">
                    {/* The map iframe is responsive in width, with a fixed height for layout stability */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0426724816684!2d90.35732931498174!3d23.771169894585985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c090ebacd7ed%3A0x2088ea38c8f5df95!2sDaffodil%20International%20University!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="DIU Location"
                    ></iframe>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-2xl font-orbitron font-bold mb-4 text-primary-neon">
                    Social Matrix Interlink
                  </h3>
                  <div className="flex space-x-4">
                    {/* Added responsiveness to social link size */}
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-indigo-700/50 backdrop-blur-sm flex items-center justify-center text-gray-200 hover:bg-secondary-neon hover:text-gray-900 transition-all duration-300 shadow-xl shadow-indigo-500/20"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Office Hours */}
                <div className="neon-card-base rounded-xl p-6 md:p-8 neon-border shadow-lg">
                  <h3 className="text-2xl font-orbitron font-bold mb-4 text-secondary-neon">
                    Operation Schedule
                  </h3>
                  {/* Changed hours to 24-hour format for a tech feel */}
                  <div className="space-y-2 text-gray-300">
                    <p className="border-b border-indigo-700/50 pb-1">
                      <span className="font-semibold text-primary-neon">
                        Monday - Friday:
                      </span>{" "}
                      0900 HR - 1700 HR
                    </p>
                    <p className="border-b border-indigo-700/50 pb-1">
                      <span className="font-semibold text-primary-neon">
                        Saturday:
                      </span>{" "}
                      1000 HR - 1400 HR
                    </p>
                    <p>
                      <span className="font-semibold text-primary-neon">
                        Sunday:
                      </span>{" "}
                      System Offline (Closed)
                    </p>
                  </div>
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
