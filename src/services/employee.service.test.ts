import { describe, expect, test } from "vitest";
import { Employee } from "../entities/employee";
import { makeFakeCompany } from "../entities/mocks/company";
import { makeFakeRequestEmployee } from "../entities/mocks/employee";
import { InMemoryCompanyRepository } from "../repositories/in-memory/in-memory.company.repository";
import { InMemoryEmployeeRepository } from "../repositories/in-memory/in-memory.employee.repository";
import { BadRequestError, ConflictError, NotFoundError } from "../shared/api-errors";
import { EmployeeService } from "./employee.service";

const makeSut = async () => {
  const companyRepository = new InMemoryCompanyRepository()
  await companyRepository.save(makeFakeCompany({ id: '123' }))
  const employeeRepository = new InMemoryEmployeeRepository(companyRepository)

  const sut = new EmployeeService(employeeRepository, companyRepository)

  return { sut };
}

describe('Employee Service', () => {
  describe('when adding a employee', () => {
    describe('should add employee in repository', () => {
      test('when success', async () => {
        const { sut } = await makeSut()
        const employee = makeFakeRequestEmployee()

        await sut.create(employee)

        expect(sut.findAll()).resolves.toBeInstanceOf(Array<Employee>)
        expect((await sut.findAll()).length).toBe(1)
      })

      test('should be not able to create a employee with duplicated id', async () => {
        const { sut } = await makeSut()
        const employee = makeFakeRequestEmployee()
        const duplicatedEmployee = makeFakeRequestEmployee()
        await sut.create(employee)

        expect(() => sut.create(duplicatedEmployee)).rejects.toThrow(new ConflictError('Invalid create employee with duplicated id'))
      })
    })
  })

  describe('when find employees', () => {
    describe('should list all employees', () => {
      test('when there is no employee', async () => {
        const { sut } = await makeSut()

        const result = await sut.findAll()

        expect(result.length).toBe(0)
      })
    })

    describe('should list a employee by id', () => {
      test('when success', async () => {
        const { sut } = await makeSut()
        const employee = makeFakeRequestEmployee()
        await sut.create(employee)

        const result = await sut.find(employee.id)

        expect(result.name).toBe(employee.name)
      })

      test('when has no company or id', async () => {
        const { sut } = await makeSut()
        const fakeId = '999'

        expect(() => sut.find(fakeId)).rejects.toThrow(new NotFoundError('Employee not found'))
      })
    })
  })

  describe('when update employee', () => {
    describe('should update employee', () => {
      test('when success', async () => {
        const { sut } = await makeSut()
        const employee = makeFakeRequestEmployee()
        const toUpdate = { name: 'Updated' }

        const result = await sut.update(employee.id, { ...employee, ...toUpdate })

        expect(result.name).toBe(toUpdate.name)
      })

      test('when has wrong id may create a new employee', async () => {
        const { sut } = await makeSut()
        const fakeId = '999'

        const result = await sut.update(fakeId, makeFakeRequestEmployee())
        const employees = await sut.findAll()

        expect((await sut.findAll()).length).toBe(1)
      })
    })
  })

  describe('when delete employee', () => {
    describe('should delete employee', () => {
      test('when success', async () => {
        const { sut } = await makeSut()
        const employee = makeFakeRequestEmployee()
        await sut.create(employee)

        await sut.delete(employee.id)

        expect((await sut.findAll()).length).toBe(0)
      })

      test('when has wrong id', async () => {
        const { sut } = await makeSut()
        const fakeId = '999'

        expect(() => sut.delete(fakeId)).rejects.toThrow(new BadRequestError('Employee not found'))
      })
    })
  })
})