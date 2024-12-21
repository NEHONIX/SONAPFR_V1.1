import * as z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),

  email: z
    .string()
    .email("Email invalide")
    .min(5, "L'email doit contenir au moins 5 caractères")
    .max(100, "L'email ne peut pas dépasser 100 caractères"),

  phone: z
    .string()
    .min(10, "Le numéro doit contenir 12 caractères avec l'indicatif +225")
    // .max(12, "Le numéro ne doit pas dépasser 12 caractères")
    .regex(
      /^\+[0-9]{1,4}[0-9]{10}$/,
      "Le numéro doit commencer par + suivi de l'indicatif pays et de 8 chiffres"
    ),

  WhatsAppPhone: z
    .string()
    .min(10, "Le numéro doit contenir 12 caractères avec l'indicatif +225")
    // .max(12, "Le numéro ne doit pas dépasser 12 caractères")
    .regex(
      /^\+[0-9]{1,4}[0-9]{10}$/,
      "Le numéro doit commencer par + suivi de l'indicatif pays et de 8 chiffres"
    )
    .optional()
    .or(z.literal("")),

  service: z.string({
    required_error: "Veuillez sélectionner un service",
  }),

  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(3000, "Le message ne peut pas dépasser 3000 caractères"),
});
