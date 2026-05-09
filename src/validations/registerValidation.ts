import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email format"),

  phone: z
    .string()
    .regex(
      /^\+\d{10,15}$/,
      "Enter valid WhatsApp number with country code"
    ),
});

export type RegisterFormData =
  z.infer<typeof registerSchema>;