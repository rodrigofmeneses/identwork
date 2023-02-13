
import { Employee, EmployeeRequest } from '../../entities/employee';
import { CompanyNotFoundError } from '../../services/errors/CompanyNotFoundError';
import { EmployeeNotFoundError } from '../../services/errors/EmployeeNotFoundError';
import { EmployeeRepository } from '../employee.repository';
import { InMemoryCompanyRepository } from './in-memory.company.repository';


export class InMemoryEmployeeRepository implements EmployeeRepository {
  items: Employee[] = []
  companyRepository: InMemoryCompanyRepository

  constructor(
    companyRepository?: InMemoryCompanyRepository
  ) {
    this.companyRepository = companyRepository ?? new InMemoryCompanyRepository()
  }

  async findAll(): Promise<Employee[]> {
    return [...this.items]
  }

  async find(id: string): Promise<Employee | null> {
    const result = this.items.find(item => item.id === id) ?? null
    return result
  }

  async create(employee: EmployeeRequest): Promise<Employee> {
    const { company_id, ...rest } = employee
    const company = await this.companyRepository.find(company_id)

    if (!company) {
      throw new CompanyNotFoundError()
    }
    return { company, ...rest }
  }

  async update(id: string, employee: EmployeeRequest): Promise<Employee> {
    const result = await this.find(id)
    if (!result) {
      throw new EmployeeNotFoundError()
    }
    const index = this.items.findIndex(item => item.id === result.id)
    this.items[index] = { ...result, ...employee }
    return { ...this.items[index] }
  }

  async delete(id: string): Promise<Employee> {
    const result = await this.find(id)
    if (!result) {
      throw new EmployeeNotFoundError()
    }
    const index = this.items.findIndex(item => item.id === result.id)
    return { ...this.items.splice(index, 1)[0] }
  }

  async save(employee: EmployeeRequest): Promise<Employee> {
    const result = await this.create(employee)
    this.items.push(result)
    return { ...result }
  }
}