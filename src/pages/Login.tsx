import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem("intraspark_users") || "[]");
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("intraspark_auth", JSON.stringify({ email }));
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } else {
      // Signup logic
      const users = JSON.parse(localStorage.getItem("intraspark_users") || "[]");
      
      if (users.find((u: any) => u.email === email)) {
        toast.error("Email already registered");
        return;
      }

      users.push({ email, password });
      localStorage.setItem("intraspark_users", JSON.stringify(users));
      localStorage.setItem("intraspark_auth", JSON.stringify({ email }));
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">


      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 neon-border">
              <h1 className="text-4xl font-orbitron font-bold mb-2 gradient-text text-center">
                {isLogin ? "Login" : "Sign Up"}
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                {isLogin ? "Access your dashboard" : "Create your account"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-background/50 border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-background/50 border-border text-foreground"
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-background/50 border-border text-foreground"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron glow-border"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </Button>

                <p className="text-center text-muted-foreground">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:underline"
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </button>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Login;
