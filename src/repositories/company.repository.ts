
import { Company } from "../entities/company";
import { Employee } from "../entities/employee";
import { Repository } from "./repository";

export interface CompanyRepository extends Repository<Company, Company> {
  findAllEmployees(id: string): Promise<Employee[]>
}