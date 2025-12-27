import { Link } from "wouter";
import { Cpu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <Cpu className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-secondary/20 transition-colors" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter text-glow">
            W!ll0W
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors cursor-pointer">System</Link>
          <Link href="/" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors cursor-pointer">Quantum</Link>
          <Link href="/signup">
            <span className="px-4 py-2 border border-primary/50 rounded-none text-primary text-xs font-mono uppercase hover:bg-primary/10 transition-colors cursor-pointer">
              Initialize_Sequence
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
