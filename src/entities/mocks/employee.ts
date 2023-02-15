import { EmployeeRequest } from "../employee";


export const makeFakeRequestEmployee = (payload?: Partial<EmployeeRequest>): EmployeeRequest => ({
  id: '123456',
  name: 'Marta',
  war_name: 'Maregs',
  admission_date: new Date(2023, 11, 11),
  company_id: '123',
  identification: '1233214513',
  print: true,
  role: 'Auxiliar',
  ...payload
})