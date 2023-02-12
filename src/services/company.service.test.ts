import { describe, expect, test } from "vitest";
import { makeFakeCompany } from "../entities/mocks/company";
import { InMemoryCompanyRepository } from "../repositories/in-memory/in-memory.company.repository";
import { BadRequestError, NotFoundError } from "../shared/api-errors";
import { CompanyService } from "./company.service";

const makeSut = () => {
  const sut = new CompanyService(new InMemoryCompanyRepository())

  return { sut };
}

describe('Company Service', () => {
  describe('when adding company', () => {
    describe('should add company in repository', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()

        await sut.create(company)

        expect(sut.findAll()).resolves.toBeInstanceOf(Array<Company>)
        expect((await sut.findAll()).length).toBe(1)
      })

      test('should be not able to create a company with duplicated name', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const duplicatedCompany = makeFakeCompany()

        await sut.create(company)

        expect(() => sut.create(duplicatedCompany)).rejects.toThrow(new BadRequestError('Invalid create company with duplicated name'))
      })
    })
  })

  describe('when find companies', () => {
    describe('should list all companies', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        await sut.create(company)

        const result = await sut.findAll()

        expect(result.length).toBe(1)
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

        const result = await sut.find(createdAnotherCompany.id)

        expect(result.name).toBe(createdAnotherCompany.name)
      })

      test('when has no company or id', async () => {
        const { sut } = makeSut()
        const fakeId = '999'

        expect(() => sut.find(fakeId)).rejects.toThrow(new NotFoundError('Company not found'))
      })
    })
  })

  describe('when update company', () => {
    describe('should update company', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const toUpdate = makeFakeCompany({ ...company, name: 'Updated' })

        const result = await sut.update(company.id, toUpdate)

        expect(result.name).toBe(toUpdate.name)
      })

    })

    describe('should create a new company', () => {
      test('when has wrong id', async () => {
        const { sut } = makeSut()
        const toUpdate = makeFakeCompany({ name: 'Updated' })

        const result = await sut.update(toUpdate.id, toUpdate)

        // expect(() => sut.update(fakeId, toUpdate)).rejects.toThrow(new BadRequestError('Company not found'))
        expect(result).toEqual(toUpdate)
        // expect(result.id).toBe(toUpdate.id)
      })
    })
  })

  describe('when delete company', () => {
    describe('should delete company', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const createdCompany = await sut.create(company)

        await sut.delete(createdCompany.id)

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