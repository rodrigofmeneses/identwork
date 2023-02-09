import { describe, expect, test } from "vitest";
import { makeFakeCompany } from "../../entities/mocks/company";
import { CompanyNotFoundError } from "../../services/errors/CompanyNotFoundError";
import { InMemoryCompanyRepository } from "./in-memory.company.repository";


const makeSut = () => {
  const sut = new InMemoryCompanyRepository()

  return { sut }
}

describe('in memory companies repository', () => {
  test('may create a company', async () => {
    const { sut } = makeSut()
    const company = makeFakeCompany()
    const anotherCompany = makeFakeCompany({ name: 'Gráfica' })

    const result = await sut.create(company)
    const anotherResult = await sut.create(anotherCompany)

    expect(result.name).toBe(company.name)
    expect(anotherResult.name).toBe(anotherCompany.name)
  })

  test('may save companies', async () => {
    const { sut } = makeSut()
    const company = makeFakeCompany()
    const anotherCompany = makeFakeCompany({ name: 'Gráfica' })

    await sut.save(company)
    await sut.save(anotherCompany)

    expect(sut.items.length).toBe(2)
    expect(sut.items[0].name).toBe(company.name)
    expect(sut.items[1].name).toBe(anotherCompany.name)
  })

  test('may update a company by id', async () => {
    const { sut } = makeSut()
    const company = makeFakeCompany()
    const updateCompany = { name: 'UPDATE' }
    const repositoryCompany = await sut.save(company)

    const result = await sut.update(repositoryCompany.id as string, updateCompany)

    expect(result.name).toBe(updateCompany.name)
  })

  test('may delete a company by id', async () => {
    const { sut } = makeSut()
    const company = makeFakeCompany()
    const createdCompany = await sut.save(company)

    await sut.delete(createdCompany.id as string)

    expect(sut.items.length).toBe(0)
  })

  test('may throw error if try delete company with not found id', async () => {
    const { sut } = makeSut()
    const company = makeFakeCompany()
    const createdCompany = await sut.save(company)

    expect(sut.delete(createdCompany.id + '1' as string)).rejects.toThrow(new CompanyNotFoundError())
  })
})