import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from 'uuid';
import { Company } from "../../entities/company";
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