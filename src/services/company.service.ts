import { Company } from "../entities/company"
import { CompanyRepository } from "../repositories/company.repository"
import { InMemoryCompanyRepository } from "../repositories/in-memory/in-memory.company.repository"
import { Service } from "./service"

interface CreateCompanyRequest {
  name: string
}

interface CreateCompanyResponse {
  id: number
  name: string
}

export class CompanyService implements Service<Company, string> {
  constructor(
    private companyRepository: CompanyRepository = new InMemoryCompanyRepository()
  ) { }

  async readAll(): Promise<Company[]> {
    return this.companyRepository.readAll()
  }

  async read(id: string): Promise<Company> {
    return this.companyRepository.read(id)
  }

  async create(company: Company): Promise<Company> {
    const companies = await this.companyRepository.readAll()

    companies.forEach(repCompany => {
      if (repCompany.name === company.name) {
        throw new Error('Invalid duplicated')
      }
    })

    const newCompany = await this.companyRepository.create(company)
    return this.companyRepository.save(newCompany)
  }

  async update(id: string, company: Company): Promise<Company> {
    return this.companyRepository.update(id, company)
  }

  async delete(id: string): Promise<Company> {
    return this.companyRepository.delete(id)
  }
}