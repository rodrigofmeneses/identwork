import { Company } from "../entities/company"
import { CompanyRepository } from "../repositories/company.repository"
import { NotFoundError } from "../repositories/errors/NotFoundError"
import { InMemoryCompanyRepository } from "../repositories/in-memory/in-memory.company.repository"
import { CompanyNotFoundError } from "./errors/CompanyNotFoundError"
import { DuplicatedCompanyError } from "./errors/DuplicatedCompanyError"
import { Service } from "./service"


export class CompanyService implements Service<Company, string> {
  companyRepository: CompanyRepository
  constructor(
    repository?: CompanyRepository
  ) {
    this.companyRepository = repository ?? new InMemoryCompanyRepository()
  }

  async readAll(): Promise<Company[]> {
    return this.companyRepository.readAll()
  }

  async read(id: string): Promise<Company> {
    try {
      const result = await this.companyRepository.read(id)
      return result
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new CompanyNotFoundError()
      }
      throw error
    }
  }

  async create(company: Company): Promise<Company> {
    const companies = await this.companyRepository.readAll()

    companies.forEach(repCompany => {
      if (repCompany.name === company.name) {
        throw new DuplicatedCompanyError()
      }
    })

    const newCompany = await this.companyRepository.create(company)
    return this.companyRepository.save(newCompany)
  }

  async update(id: string, company: Company): Promise<Company> {
    await this.read(id)
    return this.companyRepository.update(id, company)
  }

  async delete(id: string): Promise<Company> {
    await this.read(id)
    return this.companyRepository.delete(id)
  }
}