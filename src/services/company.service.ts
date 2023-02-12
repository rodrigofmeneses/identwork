import { Company } from "@prisma/client"
import { CompanyRepository } from "../repositories/company.repository"
import { PrismaCompanyRepository } from "../repositories/prisma/prisma.company.repository"
import { ConflictError, NotFoundError } from "../shared/api-errors"


export class CompanyService {
  companyRepository: CompanyRepository
  constructor(
    repository?: CompanyRepository
  ) {
    this.companyRepository = repository ?? new PrismaCompanyRepository()
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