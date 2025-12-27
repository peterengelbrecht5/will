
import { db } from "./db";
import {
  leads,
  type InsertLead,
  type Lead
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLead(id: number): Promise<Lead | undefined>;
  updatePaymentStatus(id: number, status: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async updatePaymentStatus(id: number, status: string): Promise<void> {
    await db.update(leads)
      .set({ paymentStatus: status, isHuman: status === 'verified' })
      .where(eq(leads.id, id));
  }
}

export const storage = new DatabaseStorage();
