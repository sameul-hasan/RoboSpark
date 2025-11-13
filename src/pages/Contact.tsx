import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    // Simulate submission
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "roboticsclub@diu.edu.bd",
      href: "mailto:roboticsclub@diu.edu.bd",
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: "+880 1234-567890",
      href: "tel:+8801234567890",
    },
    {
      icon: <MapPin size={24} />,
      title: "Address",
      content: "Daffodil International University, Dhaka, Bangladesh",
      href: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook size={24} />,
      label: "Facebook",
      href: "https://facebook.com",
    },
    {
      icon: <Instagram size={24} />,
      label: "Instagram",
      href: "https://instagram.com",
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
    {
      icon: <Youtube size={24} />,
      label: "YouTube",
      href: "https://youtube.com",
    },
  ];

  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6 gradient-text">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? Get in touch with the IntraSpark team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-card/50 backdrop-blur-sm rounded-lg p-6 text-center neon-border hover:glow-border transition-all duration-300"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-orbitron font-bold mb-2">
                  {info.title}
                </h3>
                <p className="text-muted-foreground">{info.content}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-orbitron font-bold mb-6 gradient-text">
                Send us a Message
              </h2>
              <form
                onSubmit={handleSubmit}
                className="bg-card/50 backdrop-blur-sm rounded-lg p-8 neon-border space-y-6"
              >
                <div>
                  <Label htmlFor="name" className="text-foreground">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    required
                    rows={6}
                    className="bg-muted/50 border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-semibold glow-border"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* Map and Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-orbitron font-bold mb-6 gradient-text">
                  Find Us
                </h2>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden neon-border h-[300px]">
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

              <div>
                <h3 className="text-2xl font-orbitron font-bold mb-4 text-primary">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 neon-border hover:glow-border"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 neon-border">
                <h3 className="text-xl font-orbitron font-bold mb-4 text-primary">
                  Office Hours
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-semibold">Monday - Friday:</span> 9:00 AM - 5:00 PM
                  </p>
                  <p>
                    <span className="font-semibold">Saturday:</span> 10:00 AM - 2:00 PM
                  </p>
                  <p>
                    <span className="font-semibold">Sunday:</span> Closed
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Contact;
