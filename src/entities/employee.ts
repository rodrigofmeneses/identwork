import { Company } from "./company"

export interface Employee {
  id: string
  name: string
  war_name: string
  role: string
  identification: string
  admission_date: Date
  print: Boolean
  company: Company
}