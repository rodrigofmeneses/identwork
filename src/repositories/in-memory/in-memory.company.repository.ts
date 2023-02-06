import { Company } from "../../entities/company";
import { CompanyRepository } from "../company.repository";
import { NotFoundError } from "../error/NotFoundError";

export class InMemoryCompanyRepository implements CompanyRepository {
  public items: Company[] = []
  index = 0

  private findById(id: string): Company {
    const company = this.items.find(item => item.id === id)
    if (!company) {
      throw new NotFoundError()
    }
    return company
  }

  async readAll(): Promise<Company[]> {
    return this.items
  }

  async read(id: string): Promise<Company> {
    const company = this.findById(id)
    return company
  }

  async create(company: Company): Promise<Company> {
    company.id = String(this.index)
    this.index++
    return company
  }

  async update(id: string, company: Partial<Company>): Promise<Company> {
    const companyDatabase = this.findById(id)
    const index = this.items.indexOf(companyDatabase)
    const result = { ...companyDatabase, ...company }
    this.items[index] = result

    return result
  }

  async delete(id: string): Promise<Company> {
    const company = this.findById(id)
    const index = this.items.indexOf(company)

    return this.items.splice(index, 1)[0]
  }

  async save(company: Company): Promise<Company> {
    company.id = String(this.index)
    this.index++
    this.items.push(company)
    return company
  }
}