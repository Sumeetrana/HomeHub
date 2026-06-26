import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const propertySchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  price: z.number().positive("Price must be positive"),
  purpose: z.enum(["BUY", "RENT"]),
  type: z.enum([
    "APARTMENT", "VILLA", "TOWNHOUSE", "PENTHOUSE",
    "STUDIO", "OFFICE", "SHOP", "WAREHOUSE", "LAND",
  ]),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  community: z.string().optional(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  area: z.number().positive("Area must be positive"),
  parking: z.number().int().min(0).default(0),
  floor: z.number().int().optional(),
  yearBuilt: z.number().int().min(1900).max(2030).optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

export const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  propertyId: z.string().optional(),
  agentId: z.string().optional(),
});

export const agentProfileSchema = z.object({
  bio: z.string().max(500).optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  agency: z.string().optional(),
  licenseNo: z.string().optional(),
  yearsExp: z.number().int().min(0).default(0),
  languages: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type AgentProfileInput = z.infer<typeof agentProfileSchema>;
