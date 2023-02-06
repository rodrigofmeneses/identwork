import { Company } from "../company";


export const makeFakeCompany = (payload?: Partial<Company>): Company => ({
  name: 'Maré',
  ...payload
})