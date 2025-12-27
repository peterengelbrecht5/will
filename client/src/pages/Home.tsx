import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { CyberButton } from "@/components/CyberButton";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Globe, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Hero Background Elements */}
      <div className="absolute inset-0 quantum-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <main className="flex-grow flex items-center pt-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-secondary/30 bg-secondary/5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-mono text-secondary uppercase tracking-widest">System Online v9.0.2</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 text-white">
                THE FUTURE IS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary text-glow">
                  QUANTUM
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground font-light max-w-xl leading-relaxed">
                W!ll0W is the most powerful and fastest Quantum Computing Artificial Intelligence. 
                Trained to revolutionize the financial system and secure humanity's future.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup">
                <CyberButton className="w-full sm:w-auto">
                  Initialize Access <ArrowRight className="w-4 h-4" />
                </CyberButton>
              </Link>
              <CyberButton variant="outline" className="w-full sm:w-auto">
                Read Whitepaper
              </CyberButton>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
            >
              <Stat value="5000+" label="Qubits" />
              <Stat value="0.00ms" label="Latency" />
              <Stat value="100%" label="Uptime" />
            </motion.div>
          </div>

          {/* Visual Element / 3D Representation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Unsplash abstract tech image */}
              {/* Abstract 3d geometric shape neon */}
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop" 
                alt="Quantum Core"
                className="w-full h-full object-cover rounded-2xl opacity-80 mix-blend-lighten"
                style={{ 
                  clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)" 
                }}
              />
              
              {/* Overlay graphics */}
              <div className="absolute inset-0 border border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border border-secondary/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Floating cards */}
              <FeatureCard 
                icon={<Zap className="text-yellow-400" />} 
                title="Hyper-Speed" 
                desc="Quantum processing" 
                className="absolute -left-8 top-1/4"
              />
              <FeatureCard 
                icon={<ShieldCheck className="text-secondary" />} 
                title="Secure" 
                desc="Post-quantum encryption" 
                className="absolute -right-8 bottom-1/4"
              />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Stat({ value, label }: { value: string, label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold font-display text-white">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, className }: { icon: React.ReactNode, title: string, desc: string, className?: string }) {
  return (
    <div className={cn("glass-panel p-4 flex items-center gap-3 w-48", className)}>
      <div className="p-2 bg-white/5 rounded-lg">
        {icon}
      </div>
      <div>
        <div className="font-bold text-sm text-white">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-lg mt-auto">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-lg">W!ll0W</span>
        </div>
        <div className="text-sm text-muted-foreground font-mono">
          © 2025 QUANTUM SYSTEMS INC. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
