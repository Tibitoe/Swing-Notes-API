import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be longer than 2 characters")
    .max(50),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).max(50),
  password: z.string().min(1, { message: "Password is required" }),
});
