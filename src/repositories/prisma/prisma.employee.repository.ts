import { PrismaClient } from "@prisma/client";
import { Employee, EmployeeRequest } from "../../entities/employee";
import { CompanyNotFoundError } from "../../services/errors/CompanyNotFoundError";
import { EmployeeRepository } from "../employee.repository";


export class PrismaEmployeeRepository implements EmployeeRepository {
  private prisma = new PrismaClient()

  async findAll(): Promise<Employee[]> {
    const result = await this.prisma.employee.findMany({ include: { company: true } })
    return result.map(employee => {
      const { company_id, ...rest } = employee
      return rest
    })
  }

  async findAllEmployeesToPrint(): Promise<Employee[]> {
    const result = await this.prisma.employee.findMany({
      where: { print: true },
      include: { company: true }
    })
    return result.map(employee => {
      const { company_id, ...rest } = employee
      return rest
    })
  }

  async findAllEmployeesByCompanyId(id: string): Promise<Employee[]> {
    const result = await this.prisma.employee.findMany({
      where: { company_id: id },
      include: { company: true }
    })

    return result.map(employee => {
      const { company_id, ...rest } = employee
      return rest
    })
  }

  async find(id: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: { id },
      include: { company: true }
    })
  }

  async create(employee: EmployeeRequest): Promise<Employee> {
    const { company_id, ...rest } = employee
    const company = await this.prisma.company.findUnique({
      where: { id: company_id }
    })

    if (!company) {
      throw new CompanyNotFoundError()
    }
    return { company, ...employee }
  }

  async save(employee: EmployeeRequest): Promise<Employee> {
    return this.prisma.employee.create({ data: employee, include: { company: true } })
  }

  async update(id: string, employee: EmployeeRequest): Promise<Employee> {
    const result = await this.find(id)
    if (!result) {
      return this.prisma.employee.create({
        data: employee, include: { company: true }
      })
    }

    return this.prisma.employee.update({
      where: { id },
      data: employee,
      include: { company: true }
    })
  }

  async changeToPrint(id: string): Promise<Employee> {
    const result = await this.prisma.employee.findUnique({
      where: { id }
    })

    return this.prisma.employee.update({
      where: { id },
      data: { print: !result?.print },
      include: { company: true }
    })
  }

  async delete(id: string): Promise<Employee> {
    return this.prisma.employee.delete({
      where: { id },
      include: { company: true }
    })
  }
}