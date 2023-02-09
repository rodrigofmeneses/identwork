import { describe, expect, test } from "vitest";
import { Employee } from "../entities/employee";
import { makeFakeEmployee } from "../entities/mocks/employee";
import { InMemoryEmployeeRepository } from "../repositories/in-memory/in-memory.employee.repository";
import { EmployeeService } from "./employee.service";
import { DuplicatedEmployeeError } from "./errors/DuplicatedEmployeeError";
import { EmployeeNotFoundError } from "./errors/EmployeeNotFoundError";

const makeSut = () => {
  const sut = new EmployeeService(new InMemoryEmployeeRepository())

  return { sut };
}

describe('Employee Service', () => {
  describe('when adding employee', () => {
    describe('should add employee in repository', () => {
      test('when success', async () => {
        const { sut } = makeSut();
        const employee = makeFakeEmployee()

        await sut.create(employee)

        expect(sut.findAll()).resolves.toBeInstanceOf(Array<Employee>)
        expect((await sut.findAll()).length).toBe(1)
      })

      test('should be not able to create a employee with duplicated id', async () => {
        const { sut } = makeSut()
        const employee = makeFakeEmployee({ id: '123' })
        const duplicatedEmployee = makeFakeEmployee({ id: '123' })

        await sut.create(employee)

        expect(() => sut.create(duplicatedEmployee)).rejects.toThrow(new DuplicatedEmployeeError())
      })
    })
  })

  describe('when find employees', () => {
    describe('should list all employees', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const employee = makeFakeEmployee()
        const anotherEmployee = makeFakeEmployee({ id: '123' })
        await sut.create(employee)
        await sut.create(anotherEmployee)

        const result = await sut.findAll()

        expect(result.length).toBe(2)
      })

      test('when there is no employees', async () => {
        const { sut } = makeSut()

        const result = await sut.findAll()

        expect(result.length).toBe(0)
      })
    })

    describe('should list a employee by id', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const employee = makeFakeEmployee()
        await sut.create(employee)

        const result = await sut.find(employee.id as string) as Employee

        expect(result.name).toBe(employee.name)
      })

      test('when has no employee', async () => {
        const { sut } = makeSut()
        const fakeId = '999'

        const result = await sut.find(fakeId)

        expect(result).toBeNull()
      })

      test('when wrong id', async () => {
        const { sut } = makeSut()
        const employee = makeFakeEmployee()
        await sut.create(employee)
        const fakeId = '999'

        const result = await sut.find(fakeId)

        expect(result).toBeNull()
      })
    })
  })

  describe('when update employee', () => {
    describe('should update employee', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const employee = makeFakeEmployee()
        const toUpdate = { name: 'Updated' }
        await sut.create(employee)

        const result = await sut.update(employee.id as string, toUpdate)

        expect(result.name).toBe(toUpdate.name)
      })

      test('when has wrong id', async () => {
        const { sut } = makeSut()
        const toUpdate = { name: 'Updated' }
        const fakeId = '999'

        expect(() => sut.update(fakeId, toUpdate)).rejects.toThrow(new EmployeeNotFoundError())
      })
    })
  })

  describe('when delete employee', () => {
    describe('should delete employee', () => {
      test('when success', async () => {
        const { sut } = makeSut()
        const employee = makeFakeEmployee()
        await sut.create(employee)

        await sut.delete(employee.id as string)

        expect((await sut.findAll()).length).toBe(0)
      })

      test('when has wrong id', async () => {
        const { sut } = makeSut()
        const fakeId = '999'

        expect(() => sut.delete(fakeId)).rejects.toThrow(new EmployeeNotFoundError())
      })
    })
  })
})