import { Company } from "../../entities/company";
import { CompanyRepository } from "../company.repository";

export class InMemoryCompanyRepository implements CompanyRepository {
  public items: Company[] = []
  index = 0

  async readAll(): Promise<Company[]> {
    return this.items
  }

  async read(id: string): Promise<Company> {
    const company = this.items.find(item => item.id === id)
    if (!company) {
      throw new Error('Company not found')
    }
    return company
  }

  async create(company: Company): Promise<Company> {
    if (!company.id) {
      company.id = String(this.index)
      this.index++
    }
    return company
  }

  async update(id: string, company: Company): Promise<Company> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<Company> {
    const companyDatabase = this.items.find(item => item.id === id)
    if (!companyDatabase) {
      throw new Error('Company not found')
    }
    const index = this.items.indexOf(companyDatabase)

    return this.items.splice(index, 1)[0]
  }

  async save(company: Company): Promise<void> {
    this.items.forEach(item => {
      if (item.name === company.name || item.id === company.id) {
        throw new Error('Invalid duplicated')
      }
    })
    if (!company.id) {
      company.id = String(this.index)
      this.index++
    }
    this.items.push(company)
  }

}

async function main() {
  const inMemoryCompanyRepository = new InMemoryCompanyRepository()
  const company = await inMemoryCompanyRepository.create(new Company({ name: 'abc' }))
  // console.log(company)

  inMemoryCompanyRepository.save(company)

  // console.log(inMemoryCompanyRepository.items)

  console.log(await inMemoryCompanyRepository.read('0'))
}

main()