import { describe, expect, it, test } from "vitest";
import { makeFakeCompany } from "../../entities/mocks/company";
import { NotFoundError } from "../error/NotFoundError";
import { InMemoryCompanyRepository } from "./in-memory.company.repository";


const makeSut = () => {
  const sut = new InMemoryCompanyRepository()

  return { sut }
}

describe('in memory companies repository', () => {
  test('may create a company', async () => {
    const { sut } = makeSut()
    const company = makeFakeCompany()

    const result = await sut.create(company)

    expect(result).toBe(company)
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

  it('may update a company by id', async () => {
    const { sut } = makeSut()
    const company = makeFakeCompany()
    const updateCompany = { name: 'UPDATE' }
    const createdCompany = await sut.save(company)

    const result = await sut.update(createdCompany.id as string, updateCompany)

    expect(result.name).toBe(updateCompany.name)
  })

  test('may delete a company by id', async () => {
    const { sut } = makeSut()
    const company = makeFakeCompany()
    const createdCompany = await sut.save(company)

    await sut.delete(company.id as string)

    expect(sut.items.length).toBe(0)
  })

  test('may throw error if try delete company with not found id', async () => {
    const { sut } = makeSut()
    const company = makeFakeCompany()
    const createdCompany = await sut.save(company)

    expect(sut.delete(createdCompany.id + '1' as string)).rejects.toThrow(new NotFoundError())
  })
})