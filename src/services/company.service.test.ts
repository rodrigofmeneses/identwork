import { beforeEach, describe, expect, it } from "vitest";
import { Company } from "../entities/company";
import { InMemoryCompanyRepository } from "../repositories/in-memory/in-memory.company.repository";
import { CompanyService } from "./company.service";

describe('Company Service', () => {
  let companyService = new CompanyService(new InMemoryCompanyRepository())

  const company = new Company({ name: 'Mare' })
  const anotherCompany = new Company({ name: 'Grafica' })

  beforeEach(() => {
    companyService = new CompanyService(new InMemoryCompanyRepository())
  })

  it('should be able to create a company', () => {

    expect(companyService.create(company)).resolves.toBeInstanceOf(Company)
    expect(companyService.create(anotherCompany)).resolves.toBeInstanceOf(Company)
  })

  it('should be not able to create a company with duplicated name', async () => {

    const duplicatedCompany = new Company({ name: 'Mare' })

    await companyService.create(company)
    expect(companyService.create(duplicatedCompany)).rejects.toThrowError()
  })

  it('should be able to list all companies', async () => {

    await companyService.create(company)
    await companyService.create(anotherCompany)

    expect(companyService.readAll()).resolves.toBeInstanceOf(Array<Company>)
  })

  it('should be able a list a company by id', async () => {
    await companyService.create(company)

    expect(companyService.read(company.id as string)).resolves.toBeInstanceOf(Company)
  })

  it('should be able to update a company', async () => {

    await companyService.create(company)
    const updatedCompany = await companyService.update('1', new Company({ name: 'Grafica' }))

    expect(updatedCompany).toBeInstanceOf(Company)
    expect(updatedCompany.name).toBe('Grafica')
  })

  it('should not be able to update a company tryng pass diferent id', async () => {

    await companyService.create(company)
    const updatedCompany = await companyService.update('1', new Company({ id: '2', name: 'Grafica' }))

    expect(updatedCompany).toBeInstanceOf(Company)
  })
})