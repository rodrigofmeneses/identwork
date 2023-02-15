import { Company } from "../entities/company"
import { Employee } from "../entities/employee"
import { CompanyRepository } from "../repositories/company.repository"
import { EmployeeRepository } from "../repositories/employee.repository"
import { PrismaCompanyRepository } from "../repositories/prisma/prisma.company.repository"
import { PrismaEmployeeRepository } from "../repositories/prisma/prisma.employee.repository"
import { ConflictError, NotFoundError } from "../shared/api-errors"


export class CompanyService {
  companyRepository: CompanyRepository
  employeeRepository: EmployeeRepository
  constructor(
    companyRepository?: CompanyRepository,
    employeeRepository?: EmployeeRepository
  ) {
    this.companyRepository = companyRepository ?? new PrismaCompanyRepository()
    this.employeeRepository = employeeRepository ?? new PrismaEmployeeRepository()
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.findAll()
  }

  async find(id: string): Promise<Company> {
    const result = await this.companyRepository.find(id)
    if (!result) {
      throw new NotFoundError('Company not found')
    }
    return result
  }

  async findAllEmployees(id: string): Promise<Employee[]> {
    return this.employeeRepository.findAllEmployeesByCompanyId(id)
  }

  async create(company: Company): Promise<Company> {
    const companies = await this.companyRepository.findAll()

    companies.forEach(repCompany => {
      if (repCompany.name === company.name) {
        throw new ConflictError('Invalid create company with duplicated name')
      }
    })

    const newCompany = await this.companyRepository.create(company)
    return this.companyRepository.save(newCompany)
  }

  async update(id: string, company: Company): Promise<Company> {
    if (!await this.companyRepository.find(id)) {
      company.id = id
      return this.create(company)
    }

    const companies = await this.companyRepository.findAll()
    companies.forEach(repCompany => {
      if (repCompany.name === company.name) {
        throw new ConflictError('Invalid create company with duplicated name')
      }
    })

    return this.companyRepository.update(id, company)
  }

  async delete(id: string): Promise<Company> {
    if (!await this.companyRepository.find(id)) {
      throw new NotFoundError('Company not found')
    }
    return this.companyRepository.delete(id)
  }
}