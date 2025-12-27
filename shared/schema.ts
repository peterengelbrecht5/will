
import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  // We store a status, but NEVER raw credit card info in DB
  paymentStatus: text("payment_status").default("pending"),
  isHuman: boolean("is_human").default(false),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  paymentStatus: true,
  isHuman: true
});

// Schema for the second step (CC details) - used for validation only, not storage
export const paymentSchema = z.object({
  cardNumber: z.string().min(16).max(19),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Format MM/YY"),
  cvc: z.string().min(3).max(4),
  cardHolder: z.string().min(1)
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
