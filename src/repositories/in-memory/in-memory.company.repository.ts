import { Company } from "../../entities/company";
import { CompanyRepository } from "../company.repository";
import { NotFoundError } from "../errors/NotFoundError";

export class InMemoryCompanyRepository implements CompanyRepository {
  public items: Company[] = []
  index = 0

  private findById(id: string): Company {
    const result = this.items.find(item => item.id === id)
    if (!result) {
      throw new NotFoundError()
    }
    return { ...result }
  }

  async readAll(): Promise<Company[]> {
    return [...this.items]
  }

  async read(id: string): Promise<Company> {
    const result = this.findById(id)
    return { ...result }
  }

  async create(company: Company): Promise<Company> {
    const result = { ...company }
    result.id = String(this.index)
    this.index++
    return { ...result }
  }

  async update(id: string, company: Partial<Company>): Promise<Company> {
    const companyDatabase = this.findById(id)
    const index = this.items.findIndex(item => item.id === companyDatabase.id)
    const result = { ...companyDatabase, ...company }
    this.items[index] = result

    return { ...result }
  }

  async delete(id: string): Promise<Company> {
    const companyDatabase = this.findById(id)
    const index = this.items.findIndex(item => item.id === companyDatabase.id)
    const result = { ...this.items.splice(index, 1)[0] }

    return { ...result }
  }

  async save(company: Company): Promise<Company> {
    const result = { ...company }
    result.id = String(this.index)
    this.index++
    this.items.push(result)
    return { ...result }
  }
}