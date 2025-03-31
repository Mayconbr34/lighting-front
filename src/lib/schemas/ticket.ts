import { z } from "zod";

export const ticketSchema = z.object({
  requesterName: z.string().min(3),
  phone: z.string().regex(/^\d{10,11}$/),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  poleType: z.enum(["concreto", "madeira", "metal", "outro"]),
  problemType: z.enum([
    "acesa-dia",
    "apagada-noite",
    "quebrada",
    "piscando",
    "outro",
  ]),
  multiplePoles: z.boolean().default(false),
});