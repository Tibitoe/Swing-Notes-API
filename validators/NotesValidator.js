import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100),
  text: z
    .string()
    .max(1000, { message: "Text must be less than 1000 characters" })
    .optional(),
});

export const updateNoteSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  text: z
    .string()
    .max(1000, { message: "Text must be less than 1000 characters" })
    .optional(),
});

export const noteIdSchema = z.string().regex(/^[0-9]+$/);
