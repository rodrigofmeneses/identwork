import { Employee } from "../employee";
import { makeFakeCompany } from "./company";


export const makeFakeEmployee = (payload?: Partial<Employee>): Employee => ({
  id: '123456',
  name: 'Marta',
  war_name: 'Maregs',
  admission_date: new Date(),
  company: makeFakeCompany(),
  identification: '1233214513',
  print: true,
  role: 'Auxiliar',
  ...payload
})