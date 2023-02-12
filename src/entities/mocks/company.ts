import { Company } from "@prisma/client";
import { v4 as uuid } from 'uuid';

export const makeFakeCompany = (payload?: Partial<Company>): Company => ({
  id: uuid(),
  name: 'Maré',
  ...payload
})