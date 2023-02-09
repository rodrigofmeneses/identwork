import { Employee } from "../entities/employee"
import { EmployeeRepository } from "../repositories/employee.repository"
import { InMemoryEmployeeRepository } from "../repositories/in-memory/in-memory.employee.repository"
import { DuplicatedEmployeeError } from "./errors/DuplicatedEmployeeError"
import { EmployeeNotFoundError } from "./errors/EmployeeNotFoundError"
import { Service } from "./service"


export class EmployeeService implements Service<Employee, string> {
  employeeRepository: EmployeeRepository
  constructor(
    repository?: EmployeeRepository
  ) {
    this.employeeRepository = repository ?? new InMemoryEmployeeRepository()
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.findAll()
  }

  async find(id: string): Promise<Employee | null> {
    return this.employeeRepository.find(id)
  }

  async create(employee: Employee): Promise<Employee> {
    const result = await this.employeeRepository.findAll()

    result.forEach(repEmployee => {
      if (repEmployee.id === employee.id) {
        throw new DuplicatedEmployeeError()
      }
    })

    const newEmployee = await this.employeeRepository.create(employee)
    return this.employeeRepository.save(newEmployee)
  }

  async update(id: string, company: Partial<Employee>): Promise<Employee> {
    try {
      const result = await this.employeeRepository.update(id, company)
      return result
    } catch (error) {
      throw new EmployeeNotFoundError()
    }
  }

  async delete(id: string): Promise<Employee> {
    try {
      const result = await this.employeeRepository.delete(id)
      return result
    } catch (error) {
      throw new EmployeeNotFoundError()
    }
  }
}