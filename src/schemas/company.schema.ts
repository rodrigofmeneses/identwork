import z from 'zod';

export const CreateCompanySchema = z.object({
  name: z.string(),
}).strict();

export const UpdateCompanySchema = z.object({
  name: z.string().optional(),
}).strict();

export type CreateCompanyRequest = z.infer<typeof CreateCompanySchema>;
export type UpdateCompanyRequest = z.infer<typeof UpdateCompanySchema>;
