import { Company } from "../entities/company"
import { CompanyRepository } from "../repositories/company.repository"
import { PrismaRepository } from "../repositories/prisma/prisma.company.repository"
import { BadRequestError, NotFoundError } from "../shared/api-errors"


export class CompanyService {
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
      if (repCompany.name === company.name || repCompany.id === company.id) {
        throw new BadRequestError('Invalid create company with duplicated name or id')
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
      throw new NotFoundError('Company not found')
    }
  }

  async delete(id: string): Promise<Company> {
    try {
      const result = await this.companyRepository.delete(id)
      return result
    } catch (error) {
      throw new NotFoundError('Company not found')
    }
  }
}