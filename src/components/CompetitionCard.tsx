import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface CompetitionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  participants: number;
  prize: string;
  fee: string;
  index: number;
}

const CompetitionCard = ({
  title,
  description,
  icon,
  participants,
  prize,
  fee,
  index,
}: CompetitionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03, translateY: -5 }}
      className="bg-card/80 backdrop-blur-sm rounded-lg p-6 neon-border hover:glow-border transition-all duration-300"
    >
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-orbitron font-bold text-foreground mb-2">
            {title}
          </h3>
        </div>
      </div>

      <p className="text-muted-foreground mb-6 min-h-[80px]">{description}</p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-primary" />
            <span className="text-muted-foreground">Max Participants</span>
          </div>
          <span className="font-semibold text-foreground">{participants}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Trophy size={16} className="text-secondary" />
            <span className="text-muted-foreground">Prize Pool</span>
          </div>
          <span className="font-semibold text-secondary">{prize}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <DollarSign size={16} className="text-primary" />
            <span className="text-muted-foreground">Registration Fee</span>
          </div>
          <span className="font-semibold text-foreground">{fee}</span>
        </div>
      </div>

      <Button
        asChild
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-semibold"
      >
        <Link to={`/register?competition=${encodeURIComponent(title)}`}>
          Register Now
        </Link>
      </Button>
    </motion.div>
  );
};

export default CompetitionCard;
