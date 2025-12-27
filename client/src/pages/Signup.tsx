import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { CyberInput } from "@/components/CyberInput";
import { CyberButton } from "@/components/CyberButton";
import { useCreateLead } from "@/hooks/use-leads";
import { api } from "@shared/routes";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Building, Hash } from "lucide-react";

// Use schema from shared routes for validation
const formSchema = api.leads.create.input;
type FormData = z.infer<typeof formSchema>;

export default function Signup() {
  const [, setLocation] = useLocation();
  const { mutate: createLead, isPending } = useCreateLead();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    }
  });

  const onSubmit = (data: FormData) => {
    createLead(data, {
      onSuccess: (lead) => {
        // Pass the ID to the next step
        setLocation(`/verification?id=${lead.id}`);
      }
    });
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <main className="flex-grow container mx-auto px-6 pt-32 pb-20 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-display font-bold mb-2">Initialize Profile</h1>
            <p className="text-muted-foreground font-light">
              Enter your biometrics to begin the quantum synchronization process.
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30" />

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <CyberInput
                  label="First Name"
                  placeholder="JOHN"
                  icon={<User className="w-4 h-4" />}
                  error={form.formState.errors.firstName?.message}
                  {...form.register("firstName")}
                />
                <CyberInput
                  label="Last Name"
                  placeholder="DOE"
                  icon={<User className="w-4 h-4" />}
                  error={form.formState.errors.lastName?.message}
                  {...form.register("lastName")}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <CyberInput
                  label="Email Frequency"
                  type="email"
                  placeholder="user@domain.com"
                  icon={<Mail className="w-4 h-4" />}
                  error={form.formState.errors.email?.message}
                  {...form.register("email")}
                />
                <CyberInput
                  label="Comms Link"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  icon={<Phone className="w-4 h-4" />}
                  error={form.formState.errors.phone?.message}
                  {...form.register("phone")}
                />
              </div>

              <div className="space-y-6 pt-4 border-t border-white/5">
                <CyberInput
                  label="Coordinates (Address)"
                  placeholder="123 QUANTUM AVE"
                  icon={<MapPin className="w-4 h-4" />}
                  error={form.formState.errors.address?.message}
                  {...form.register("address")}
                />
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <CyberInput
                    label="Sector (City)"
                    placeholder="NEO TOKYO"
                    icon={<Building className="w-4 h-4" />}
                    error={form.formState.errors.city?.message}
                    {...form.register("city")}
                  />
                  <CyberInput
                    label="Zone (State)"
                    placeholder="CA"
                    error={form.formState.errors.state?.message}
                    {...form.register("state")}
                  />
                  <CyberInput
                    label="Grid (Zip)"
                    placeholder="90210"
                    icon={<Hash className="w-4 h-4" />}
                    error={form.formState.errors.zipCode?.message}
                    {...form.register("zipCode")}
                  />
                </div>
              </div>

              <div className="pt-6">
                <CyberButton 
                  type="submit" 
                  className="w-full"
                  isLoading={isPending}
                >
                  Proceed to Verification
                </CyberButton>
                <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
                  ENCRYPTED CONNECTION ESTABLISHED. DATA IS SECURE.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
