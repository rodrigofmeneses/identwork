import { describe, expect, test } from "vitest";
import { Company } from "../entities/company";
import { makeFakeCompany } from "../entities/mocks/company";
import { InMemoryCompanyRepository } from "../repositories/in-memory/in-memory.company.repository";
import { BadRequestError } from "../shared/api-errors";
import { CompanyService } from "./company.service";

const makeSut = () => {
  const sut = new CompanyService(new InMemoryCompanyRepository())

  return { sut };
}

describe('Company Service', () => {
  describe('when adding company', () => {
    describe('should add company in repository', () => {
      test('when success', async () => {
        const { sut } = makeSut();
        const company = makeFakeCompany()
        const anotherCompany = makeFakeCompany({ name: 'Gráfica' })

        await sut.create(company)
        await sut.create(anotherCompany)

        expect(sut.findAll()).resolves.toBeInstanceOf(Array<Company>)
        expect((await sut.findAll()).length).toBe(2)
      })

      test('should be not able to create a company with duplicated name', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const duplicatedCompany = makeFakeCompany()

        await sut.create(company)

        expect(() => sut.create(duplicatedCompany)).rejects.toThrow(new BadRequestError('Invalid create company with duplicated name or id'))
      })
    })
  })

  describe('when find companies', () => {
    describe('should list all companies', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const anotherCompany = makeFakeCompany({ name: 'Gráfica' })
        await sut.create(company)
        await sut.create(anotherCompany)

        const result = await sut.findAll()

        expect(result.length).toBe(2)
      })

      test('when there is no company', async () => {
        const { sut } = makeSut()

        const result = await sut.findAll()

        expect(result.length).toBe(0)
      })
    })

    describe('should list a company by id', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const anotherCompany = makeFakeCompany({ name: 'Gráfica' })
        await sut.create(company)
        const createdAnotherCompany = await sut.create(anotherCompany)

        const result = await sut.find(createdAnotherCompany.id as string) as Company

        expect(result.name).toBe(createdAnotherCompany.name)
      })

      test('when has no company or id', async () => {
        const { sut } = makeSut()
        const fakeId = '999'

        const result = await sut.find(fakeId)

        expect(result).toBeNull()
      })
    })
  })

  describe('when update company', () => {
    describe('should update company', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const toUpdate = { name: 'Updated' }
        const createdCompany = await sut.create(company)

        const result = await sut.update(createdCompany.id as string, toUpdate)

        expect(result.name).toBe(toUpdate.name)
      })

      test('when has wrong id', async () => {
        const { sut } = makeSut()
        const toUpdate = { name: 'Updated' }
        const fakeId = '999'

        expect(() => sut.update(fakeId, toUpdate)).rejects.toThrow(new BadRequestError('Company not found'))
      })
    })
  })

  describe('when delete company', () => {
    describe('should delete company', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const createdCompany = await sut.create(company)

        await sut.delete(createdCompany.id as string)

        expect((await sut.findAll()).length).toBe(0)
      })

      test('when has wrong id', async () => {
        const { sut } = makeSut()
        const fakeId = '999'

        expect(() => sut.delete(fakeId)).rejects.toThrow(new BadRequestError('Company not found'))
      })
    })
  })
})