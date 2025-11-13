import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollToTop from "./ScrollToTop";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem("intraspark_auth");
    setIsAuthenticated(!!auth);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Competitions", path: "/competitions" },
    { name: "Register", path: "/register" },
    ...(isAuthenticated ? [{ name: "Dashboard", path: "/dashboard" }] : []),
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${
      isScrolled
        ? "bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg"
        : "bg-white/5 backdrop-blur-md"
    }`}
    >
      <ScrollToTop />
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-orbitron font-bold gradient-text">
              IntraSpark
            </span>
            <span className="text-sm text-primary font-orbitron">2025</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all duration-300 hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary text-glow-primary"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-semibold glow-border"
            >
              <Link to="/register">Register Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="
        md:hidden mt-4 pb-4 space-y-4 
        bg-gray-900/95 
        backdrop-blur-xl 
        border border-primary/30 
        rounded-xl 
        shadow-lg 
        px-4 py-5
      "
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 font-medium transition-all duration-300 hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary text-glow-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-semibold"
              >
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  Register Now
                </Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
