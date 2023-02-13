import { Employee, EmployeeRequest } from "../entities/employee"
import { CompanyRepository } from "../repositories/company.repository"
import { EmployeeRepository } from "../repositories/employee.repository"
import { PrismaCompanyRepository } from "../repositories/prisma/prisma.company.repository"
import { PrismaEmployeeRepository } from "../repositories/prisma/prisma.employee.repository"
import { BadRequestError, ConflictError, NotFoundError } from "../shared/api-errors"


export class EmployeeService {
  private employeeRepository: EmployeeRepository
  private companyRepository: CompanyRepository
  constructor(
    repositoryEmployee?: EmployeeRepository,
    repositoryCompany?: CompanyRepository
  ) {
    this.employeeRepository = repositoryEmployee ?? new PrismaEmployeeRepository()
    this.companyRepository = repositoryCompany ?? new PrismaCompanyRepository()
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.findAll()
  }

  async find(id: string): Promise<Employee> {
    const result = await this.employeeRepository.find(id)
    if (!result) {
      throw new NotFoundError('Employee not found')
    }
    return result
  }

  async create(employee: EmployeeRequest): Promise<Employee> {
    const employees = await this.employeeRepository.findAll()

    employees.forEach(repEmployee => {
      if (repEmployee.id === employee.id) {
        throw new ConflictError('Invalid create employee with duplicated id')
      }
    })

    const result = await this.companyRepository.find(employee.company_id)
    if (!result) {
      throw new BadRequestError('Invalid company id')
    }

    return this.employeeRepository.save(employee)
  }

  async update(id: string, employee: EmployeeRequest): Promise<Employee> {
    if (!await this.employeeRepository.find(id)) {
      return this.create(employee)
    }

    const companies = await this.employeeRepository.findAll()
    companies.forEach(repEmployee => {
      if (repEmployee.id === employee.id) {
        throw new ConflictError('Invalid create employee with duplicated id')
      }
    })

    return this.employeeRepository.update(id, employee)
  }

  async delete(id: string): Promise<Employee> {
    if (!await this.employeeRepository.find(id)) {
      throw new NotFoundError('Employee not found')
    }
    return this.employeeRepository.delete(id)
  }
}