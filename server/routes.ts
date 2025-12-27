
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      
      // TODO: Here we will sync to Google Sheets once the integration is set up.
      // We would use the Google Sheets API to append a row with:
      // [lead.firstName, lead.lastName, lead.email, ...]
      
      res.status(201).json(lead);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.leads.verifyPayment.path, async (req, res) => {
    try {
      const { id } = req.params;
      const input = api.leads.verifyPayment.input.parse(req.body);
      
      const lead = await storage.getLead(Number(id));
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }

      // Simulate payment processing
      // In a real app, this would call Stripe or another processor
      // For this MVP, we simulate a successful $1 charge
      
      const success = true; // Simulate success
      
      if (success) {
        await storage.updatePaymentStatus(lead.id, 'verified');
        
        // TODO: Update Google Sheet row with "Verified" status
        
        res.json({ success: true, message: "Verification complete" });
      } else {
        res.status(400).json({ message: "Payment failed" });
      }

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
