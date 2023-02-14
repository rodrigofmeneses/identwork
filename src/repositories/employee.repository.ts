import { Employee, EmployeeRequest } from "../entities/employee";

import { Repository } from "./repository";

export interface EmployeeRepository extends Repository<EmployeeRequest, Employee> {
  changeToPrint(id: string): Promise<Employee>
  findAllEmployeesByCompanyId(companyId: string): Promise<Employee[]>
}