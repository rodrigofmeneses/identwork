import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from 'uuid';
import { Company } from "../../entities/company";
import { CompanyNotFoundError } from "../../services/errors/CompanyNotFoundError";
import { Repository } from "../repository";

export class PrismaRepository implements Repository<Company, string> {
  prisma = new PrismaClient()

  async readAll(): Promise<Company[]> {
    return this.prisma.company.findMany()
  }
  async read(id: string): Promise<Company> {
    const result = await this.prisma.company.findUnique({
      where: { id: id }
    })

    if (!result) {
      throw new CompanyNotFoundError()
    }

    return result
  }

  async create(company: Company): Promise<Company> {
    const result = { ...company }
    result.id = uuid()
    return result
  }

  async save(company: Company): Promise<Company> {
    return this.prisma.company.create({
      data: company
    })
  }

  async update(id: string, company: Partial<Company>): Promise<Company> {
    await this.read(id)
    return this.prisma.company.update({
      where: { id },
      data: company
    })
  }

  async delete(id: string): Promise<Company> {
    await this.read(id)
    return this.prisma.company.delete({
      where: { id }
    })
  }

}