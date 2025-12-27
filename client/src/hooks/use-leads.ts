import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type errorSchemas } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Create Lead (Step 1)
export function useCreateLead() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.leads.create.input>) => {
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create lead");
      }

      return api.leads.create.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: error.message,
      });
    },
  });
}

// Verify Payment (Step 2)
export function useVerifyPayment() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & z.infer<typeof api.leads.verifyPayment.input>) => {
      const url = buildUrl(api.leads.verifyPayment.path, { id });
      const res = await fetch(url, {
        method: api.leads.verifyPayment.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Payment verification failed");
        }
        throw new Error("Verification failed. Please check your details.");
      }

      return api.leads.verifyPayment.responses[200].parse(await res.json());
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Verification Complete",
        description: "Welcome to the W!ll0W Network.",
        className: "bg-primary/20 border-primary text-foreground",
      });
    }
  });
}
