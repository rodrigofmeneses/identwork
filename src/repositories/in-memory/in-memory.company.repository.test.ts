import { beforeEach, describe, expect, it } from "vitest";
import { Company } from "../../entities/company";
import { InMemoryCompanyRepository } from "./in-memory.company.repository";

describe('in memory companies repository', () => {
  const company = new Company({ id: '0', name: 'Mare' })
  const anotherCompany = new Company({ id: '1', name: 'Grafica' })

  const inMemoryCompanyRepository = new InMemoryCompanyRepository()

  beforeEach(() => {
    inMemoryCompanyRepository.items.length = 0
    inMemoryCompanyRepository.index = 0
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

  it('may not save a company with duplicated name', async () => {
    const newCompany = new Company({ name: 'Mare' })

    await inMemoryCompanyRepository.save(company)

    expect(
      inMemoryCompanyRepository.save(newCompany)
    ).rejects.toThrowError()
  })

  it('may not save a company with duplicated id', async () => {
    const newCompany = new Company({ id: '0', name: 'Grafica' })

    await inMemoryCompanyRepository.save(company)

    expect(
      inMemoryCompanyRepository.save(newCompany)
    ).rejects.toThrowError()
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