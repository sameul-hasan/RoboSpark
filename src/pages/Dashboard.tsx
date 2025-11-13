import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Registration {
  id: number;
  teamName: string;
  institution: string;
  competition: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  member2Name: string;
  member3Name: string;
  registeredAt: string;
}

const Dashboard = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("intraspark_auth");
    if (!auth) {
      navigate("/login");
      return;
    }

    const loadRegistrations = () => {
      const data = localStorage.getItem("intraspark_registrations");
      if (data) {
        setRegistrations(JSON.parse(data));
      }
    };

    loadRegistrations();
  }, [navigate]);

  const exportToCSV = () => {
    if (registrations.length === 0) {
      toast.error("No registrations to export");
      return;
    }

    const headers = [
      "ID",
      "Team Name",
      "Institution",
      "Competition",
      "Leader Name",
      "Leader Email",
      "Leader Phone",
      "Member 2",
      "Member 3",
      "Registered At",
    ];

    const csvContent = [
      headers.join(","),
      ...registrations.map((reg) =>
        [
          reg.id,
          `"${reg.teamName}"`,
          `"${reg.institution}"`,
          `"${reg.competition}"`,
          `"${reg.leaderName}"`,
          reg.leaderEmail,
          reg.leaderPhone,
          `"${reg.member2Name || "N/A"}"`,
          `"${reg.member3Name || "N/A"}"`,
          new Date(reg.registeredAt).toLocaleString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `intraspark_registrations_${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Registrations exported successfully!");
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
              Registration Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              View and manage all team registrations for IntraSpark 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-orbitron font-bold text-primary">
                  Total Registrations: {registrations.length}
                </h2>
              </div>
              <Button
                onClick={exportToCSV}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron glow-border"
              >
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </Button>
            </div>

            {registrations.length === 0 ? (
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-12 text-center neon-border">
                <p className="text-xl text-muted-foreground">
                  No registrations yet. Teams will appear here once they register.
                </p>
              </div>
            ) : (
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 neon-border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-muted/30">
                      <TableHead className="text-primary font-orbitron">Team Name</TableHead>
                      <TableHead className="text-primary font-orbitron">Institution</TableHead>
                      <TableHead className="text-primary font-orbitron">Competition</TableHead>
                      <TableHead className="text-primary font-orbitron">Leader Name</TableHead>
                      <TableHead className="text-primary font-orbitron">Email</TableHead>
                      <TableHead className="text-primary font-orbitron">Phone</TableHead>
                      <TableHead className="text-primary font-orbitron">Member 2</TableHead>
                      <TableHead className="text-primary font-orbitron">Member 3</TableHead>
                      <TableHead className="text-primary font-orbitron">Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((reg) => (
                      <TableRow key={reg.id} className="border-border hover:bg-muted/30">
                        <TableCell className="font-medium text-foreground">{reg.teamName}</TableCell>
                        <TableCell className="text-muted-foreground">{reg.institution}</TableCell>
                        <TableCell className="text-muted-foreground">{reg.competition}</TableCell>
                        <TableCell className="text-muted-foreground">{reg.leaderName}</TableCell>
                        <TableCell className="text-muted-foreground">{reg.leaderEmail}</TableCell>
                        <TableCell className="text-muted-foreground">{reg.leaderPhone}</TableCell>
                        <TableCell className="text-muted-foreground">{reg.member2Name || "N/A"}</TableCell>
                        <TableCell className="text-muted-foreground">{reg.member3Name || "N/A"}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(reg.registeredAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Dashboard;
