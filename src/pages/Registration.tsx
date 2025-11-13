import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Registration = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    teamName: "",
    institution: "",
    competition: searchParams.get("competition") || "",
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    member2Name: "",
    member3Name: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const competitions = [
    "Drone Challenge",
    "Line Following Robot (LFR)",
    "Techathon",
    "Robot Soccer",
    "Cosmo Cleanse",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompetitionChange = (value: string) => {
    setFormData({
      ...formData,
      competition: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (
      !formData.teamName ||
      !formData.institution ||
      !formData.competition ||
      !formData.leaderName ||
      !formData.leaderEmail ||
      !formData.leaderPhone
    ) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.leaderEmail)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.leaderPhone.replace(/[\s-]/g, ""))) {
      toast.error("Please enter a valid phone number");
      setIsSubmitting(false);
      return;
    }

    // Save to localStorage
    setTimeout(() => {
      const existingRegistrations = JSON.parse(
        localStorage.getItem("intraspark_registrations") || "[]"
      );

      const newRegistration = {
        id: Date.now(),
        ...formData,
        registeredAt: new Date().toISOString(),
      };

      existingRegistrations.push(newRegistration);
      localStorage.setItem(
        "intraspark_registrations",
        JSON.stringify(existingRegistrations)
      );

      console.log("Form submitted:", formData);
      toast.success(
        "Thank you! Your team has been successfully registered for IntraSpark 2025.",
        {
          description: `Team ${formData.teamName} registered for ${formData.competition}`,
        }
      );

      // Reset form
      setFormData({
        teamName: "",
        institution: "",
        competition: "",
        leaderName: "",
        leaderEmail: "",
        leaderPhone: "",
        member2Name: "",
        member3Name: "",
      });

      setIsSubmitting(false);
    }, 1500);
  };

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
              Team Registration
            </h1>
            <p className="text-xl text-muted-foreground">
              Register your team for IntraSpark 2025 and compete for amazing
              prizes!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-8 md:p-12 neon-border space-y-6"
            >
              {/* Team Information */}
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-primary mb-6">
                  Team Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="teamName" className="text-foreground">
                      Team Name *
                    </Label>
                    <Input
                      id="teamName"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      placeholder="Enter your team name"
                      required
                      className="bg-muted/50 border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="institution" className="text-foreground">
                      Institution Name *
                    </Label>
                    <Input
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      placeholder="Enter your university/college name"
                      required
                      className="bg-muted/50 border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="competition" className="text-foreground">
                      Competition *
                    </Label>
                    <Select
                      value={formData.competition}
                      onValueChange={handleCompetitionChange}
                    >
                      <SelectTrigger className="bg-muted/50 border-border">
                        <SelectValue placeholder="Select a competition" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {competitions.map((comp) => (
                          <SelectItem key={comp} value={comp}>
                            {comp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Team Leader Information */}
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-primary mb-6">
                  Team Leader Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="leaderName" className="text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="leaderName"
                      name="leaderName"
                      value={formData.leaderName}
                      onChange={handleInputChange}
                      placeholder="Enter team leader's full name"
                      required
                      className="bg-muted/50 border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="leaderEmail" className="text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="leaderEmail"
                      name="leaderEmail"
                      type="email"
                      value={formData.leaderEmail}
                      onChange={handleInputChange}
                      placeholder="leader@example.com"
                      required
                      className="bg-muted/50 border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="leaderPhone" className="text-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      id="leaderPhone"
                      name="leaderPhone"
                      type="tel"
                      value={formData.leaderPhone}
                      onChange={handleInputChange}
                      placeholder="+880 1234-567890"
                      required
                      className="bg-muted/50 border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-primary mb-6">
                  Team Members
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="member2Name" className="text-foreground">
                      Member 2 Name
                    </Label>
                    <Input
                      id="member2Name"
                      name="member2Name"
                      value={formData.member2Name}
                      onChange={handleInputChange}
                      placeholder="Enter member 2's full name (optional)"
                      className="bg-muted/50 border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="member3Name" className="text-foreground">
                      Member 3 Name
                    </Label>
                    <Input
                      id="member3Name"
                      name="member3Name"
                      value={formData.member3Name}
                      onChange={handleInputChange}
                      placeholder="Enter member 3's full name (optional)"
                      className="bg-muted/50 border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-semibold text-lg py-6 glow-border"
                >
                  {isSubmitting ? "Submitting..." : "Register Team"}
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  * Required fields. You'll receive a confirmation email after
                  registration.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
