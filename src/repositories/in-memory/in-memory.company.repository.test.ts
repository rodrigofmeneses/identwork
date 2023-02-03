import { beforeEach, describe, expect, it } from "vitest";
import { Company } from "../../entities/company";
import { InMemoryCompanyRepository } from "./in-memory.company.repository";

describe('in memory companies repository', () => {
  const company = new Company({ name: 'Mare' })
  const anotherCompany = new Company({ name: 'Grafica' })

  let inMemoryCompanyRepository = new InMemoryCompanyRepository()

  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository()
  })

  it('may create a company', async () => {
    const newCompany = inMemoryCompanyRepository.create(company)
    expect(
      newCompany
    ).resolves.toBeInstanceOf(Company)
  })

  it('may save companies', async () => {
    await inMemoryCompanyRepository.save(company)
    await inMemoryCompanyRepository.save(anotherCompany)

    expect(inMemoryCompanyRepository.items.length).toBe(2)
    expect(inMemoryCompanyRepository.items[0].name).toBe('Mare')
    expect(inMemoryCompanyRepository.items[1].name).toBe('Grafica')
  })

  it('may update a company by id', async () => {
    await inMemoryCompanyRepository.save(company)

    const toUpdate = new Company({ name: 'UPDATE' })
    const updatedCompany = await inMemoryCompanyRepository.update('0', toUpdate)

    expect(updatedCompany).toBeInstanceOf(Company)
    expect(updatedCompany.name).toBe('UPDATE')
  })

  it('may delete a company by id', async () => {
    await inMemoryCompanyRepository.save(company)
    await inMemoryCompanyRepository.delete(company.id as string)
    expect(inMemoryCompanyRepository.items.length).toBe(0)

  })

  it('may throw error if try delete company with not found id', async () => {
    expect(
      inMemoryCompanyRepository.delete('0')
    ).rejects.toThrowError()
  })

})