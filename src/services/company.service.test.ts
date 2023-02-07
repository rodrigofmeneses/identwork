import { describe, expect, test } from "vitest";
import { Company } from "../entities/company";
import { makeFakeCompany } from "../entities/mocks/company";
import { InMemoryCompanyRepository } from "../repositories/in-memory/in-memory.company.repository";
import { CompanyService } from "./company.service";
import { CompanyNotFoundError } from "./errors/CompanyNotFoundError";
import { DuplicatedCompanyError } from "./errors/DuplicatedCompanyError";

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

        expect(sut.readAll()).resolves.toBeInstanceOf(Array<Company>)
        expect((await sut.readAll()).length).toBe(2)
      })

      test('should be not able to create a company with duplicated name', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const duplicatedCompany = makeFakeCompany()

        await sut.create(company)

        expect(() => sut.create(duplicatedCompany)).rejects.toThrow(new DuplicatedCompanyError())
      })
    })
  })

  describe('when read companies', () => {
    describe('should list all companies', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const anotherCompany = makeFakeCompany({ name: 'Gráfica' })
        await sut.create(company)
        await sut.create(anotherCompany)

        const result = await sut.readAll()

        expect(result.length).toBe(2)
      })

      test('when there is no company', async () => {
        const { sut } = makeSut()

        const result = await sut.readAll()

        expect(result.length).toBe(0)
      })
    })

    describe('should list a company by id', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const anotherCompany = makeFakeCompany({ name: 'Gráfica' })

        await sut.create(company)
        await sut.create(anotherCompany)

        const result = await sut.read(anotherCompany.id as string)

        expect(result).toBe(anotherCompany)
      })

      test('when has no company or id', async () => {
        const { sut } = makeSut()
        const fakeId = '999'

        expect(() => sut.read(fakeId)).rejects.toThrow(new CompanyNotFoundError())
      })
    })
  })

  describe('when update company', () => {
    describe('should update company', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        const toUpdate = { name: 'Updated' }
        await sut.create(company)

        const result = await sut.update(company.id as string, toUpdate)

        expect(result).not.toBe(company)
        expect(result.name).toBe(toUpdate.name)
      })

      test('when has wrong id', async () => {
        const { sut } = makeSut()
        const toUpdate = { name: 'Updated' }

        expect(() => sut.update('1', toUpdate)).rejects.toThrow(new CompanyNotFoundError())
      })
    })
  })

  describe('when delete company', () => {
    describe('should delete company', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const company = makeFakeCompany()
        await sut.create(company)

        await sut.delete(company.id as string)

        expect((await sut.readAll()).length).toBe(0)
      })

      test('when has wrong id', async () => {
        const { sut } = makeSut()
        const fakeId = '999'

        expect(() => sut.delete(fakeId)).rejects.toThrow(new CompanyNotFoundError())
      })
    })
  })
})