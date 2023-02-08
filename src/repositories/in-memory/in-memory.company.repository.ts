import { v4 as uuid } from 'uuid';
import { Company } from "../../entities/company";
import { CompanyRepository } from "../company.repository";
import { ResourceNotFoundError } from '../errors/EntityNotFoundError';


export class InMemoryCompanyRepository implements CompanyRepository {
  public items: Company[] = []

  async findAll(): Promise<Company[]> {
    return [...this.items]
  }

  async find(id: string): Promise<Company | null> {
    const result = this.items.find(item => item.id === id) ?? null
    return result
  }

  async create(company: Company): Promise<Company> {
    const result = { ...company }
    result.id = uuid()
    return { ...result }
  }

  async update(id: string, company: Partial<Company>): Promise<Company> {
    const companyDatabase = await this.find(id)
    if (!companyDatabase) {
      throw new ResourceNotFoundError()
    }
    const index = this.items.findIndex(item => item.id === companyDatabase.id)
    const result = { ...companyDatabase, ...company }
    this.items[index] = result
    return { ...result }
  }

  async delete(id: string): Promise<Company> {
    const companyDatabase = await this.find(id)
    if (!companyDatabase) {
      throw new ResourceNotFoundError()
    }
    const index = this.items.findIndex(item => item.id === companyDatabase.id)
    const result = { ...this.items.splice(index, 1)[0] }
    return { ...result }
  }

  async save(company: Company): Promise<Company> {
    const result = { ...company }
    result.id = uuid()
    this.items.push(result)
    return { ...result }
  }
}