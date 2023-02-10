import { Company } from "../entities/company"
import { CompanyRepository } from "../repositories/company.repository"
import { PrismaRepository } from "../repositories/prisma/prisma.company.repository"
import { CreateCompanyRequest, UpdateCompanyRequest } from "../schemas/company.schema"
import { ConflictError, NotFoundError } from "../shared/api-errors"


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

  async find(id: string): Promise<Company> {
    const result = await this.companyRepository.find(id)
    if (!result) {
      throw new NotFoundError('Company not found')
    }
    return result
  }

  async create(company: CreateCompanyRequest): Promise<Company> {
    const companies = await this.companyRepository.findAll()

    companies.forEach(repCompany => {
      if (repCompany.name === company.name) {
        throw new ConflictError('Invalid create company with duplicated name')
      }
    })

    const newCompany = await this.companyRepository.create(company)
    return this.companyRepository.save(newCompany)
  }

  async update(id: string, company: UpdateCompanyRequest): Promise<Company> {
    if (!await this.companyRepository.find(id)) {
      throw new NotFoundError('Company not found')
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