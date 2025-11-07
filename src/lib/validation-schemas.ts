import { z } from "zod";
import { CATEGORIES } from "./cosplay-types";

/**
 * Validation schema for participant registration
 */
export const participantSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ0-9\s\-'".]+$/, "Nome contém caracteres inválidos"),
  categoria: z.enum(CATEGORIES, {
    errorMap: () => ({ message: "Categoria inválida" })
  }),
  cosplay: z
    .string()
    .trim()
    .min(1, "Nome do cosplay/personagem é obrigatório")
    .max(200, "Nome do cosplay deve ter no máximo 200 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ0-9\s\-'".,:;!?()&/]+$/, "Nome do cosplay contém caracteres inválidos")
});

/**
 * Validation schema for judge scores
 */
export const scoreSchema = z
  .number({
    invalid_type_error: "Nota deve ser um número",
    required_error: "Nota é obrigatória"
  })
  .min(0, "Nota mínima é 0")
  .max(10, "Nota máxima é 10")
  .multipleOf(0.5, "Nota deve ser múltiplo de 0.5 (ex: 7.0, 7.5, 8.0)")
  .nullable();

/**
 * Type inference for TypeScript
 */
export type ParticipantInput = z.infer<typeof participantSchema>;
export type ScoreInput = z.infer<typeof scoreSchema>;
