import z from 'zod';
import { CreateCompanySchema } from './company.schema';

export const CreateEmployeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  war_name: z.string(),
  role: z.string(),
  identification: z.string(),
  admission_date: z.coerce.date(),
  print: z.boolean(),
  company_id: z.string()
}).strict();

export const UpdateEmployeeSchema = CreateCompanySchema
