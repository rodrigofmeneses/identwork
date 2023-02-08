import { Company } from "../entities/company"
import { CompanyRepository } from "../repositories/company.repository"
import { PrismaRepository } from "../repositories/prisma/prisma.company.repository"
import { CompanyNotFoundError } from "./errors/CompanyNotFoundError"
import { DuplicatedCompanyError } from "./errors/DuplicatedCompanyError"
import { Service } from "./service"


export class CompanyService implements Service<Company, string> {
  companyRepository: CompanyRepository
  constructor(
    repository?: CompanyRepository
  ) {
    this.companyRepository = repository ?? new PrismaRepository()
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.findAll()
  }

  async find(id: string): Promise<Company | null> {
    const result = await this.companyRepository.find(id)
    return result
  }

  async create(company: Company): Promise<Company> {
    const companies = await this.companyRepository.findAll()

    companies.forEach(repCompany => {
      if (repCompany.name === company.name) {
        throw new DuplicatedCompanyError()
      }
    })

    const newCompany = await this.companyRepository.create(company)
    return this.companyRepository.save(newCompany)
  }

  async update(id: string, company: Partial<Company>): Promise<Company> {
    try {
      const result = await this.companyRepository.update(id, company)
      return result
    } catch (error) {
      throw new CompanyNotFoundError()
    }
  }

  async delete(id: string): Promise<Company> {
    try {
      const result = await this.companyRepository.delete(id)
      return result
    } catch (error) {
      throw new CompanyNotFoundError()
    }
  }
}