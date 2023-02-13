import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from 'uuid';
import { Company } from "../../entities/company";
import { Employee } from "../../entities/employee";
import { CompanyRepository } from "../company.repository";


export class PrismaCompanyRepository implements CompanyRepository {
  prisma = new PrismaClient()

  async findAll(): Promise<Company[]> {
    return this.prisma.company.findMany()
  }

  async find(id: string): Promise<Company | null> {
    return this.prisma.company.findUnique({
      where: { id }
    })
  }

  async findAllEmployees(id: string): Promise<Employee[]> {
    const result = await this.prisma.employee.findMany({
      where: { company_id: id },
      include: { company: true }
    })

    return result.map(employee => {
      const { company_id, ...rest } = employee
      return rest
    })
  }

  async create(company: Company): Promise<Company> {
    const result = { ...company }
    if (!company.id) {
      result.id = uuid()
    }
    return result
  }

  async save(company: Company): Promise<Company> {
    return this.prisma.company.create({
      data: company
    })
  }

  async update(id: string, company: Partial<Company>): Promise<Company> {
    return this.prisma.company.update({
      where: { id },
      data: company
    })
  }

  async delete(id: string): Promise<Company> {
    return this.prisma.company.delete({
      where: { id }
    })
  }

}