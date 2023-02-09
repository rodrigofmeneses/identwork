import { Employee } from '../../entities/employee';
import { EmployeeRepository } from '../employee.repository';
import { ResourceNotFoundError } from '../errors/EntityNotFoundError';


export class InMemoryEmployeeRepository implements EmployeeRepository {
  public items: Employee[] = []

  async findAll(): Promise<Employee[]> {
    return [...this.items]
  }

  async find(id: string): Promise<Employee | null> {
    const result = this.items.find(item => item.id === id) ?? null
    return result
  }

  async create(employee: Employee): Promise<Employee> {
    const result = { ...employee }
    return { ...result }
  }

  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    const employeeDatabase = await this.find(id)
    if (!employeeDatabase) {
      throw new ResourceNotFoundError()
    }
    const index = this.items.findIndex(item => item.id === employeeDatabase.id)
    const result = { ...employeeDatabase, ...employee }
    this.items[index] = result
    return { ...result }
  }

  async delete(id: string): Promise<Employee> {
    const employeeDatabase = await this.find(id)
    if (!employeeDatabase) {
      throw new ResourceNotFoundError()
    }
    const index = this.items.findIndex(item => item.id === employeeDatabase.id)
    const result = { ...this.items.splice(index, 1)[0] }
    return { ...result }
  }

  async save(employee: Employee): Promise<Employee> {
    const result = { ...employee }
    this.items.push(result)
    return { ...result }
  }
}