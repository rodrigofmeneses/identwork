import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from 'uuid';
import { Company } from "../../entities/company";
import { CompanyNotFoundError } from "../../services/errors/CompanyNotFoundError";
import { NotFoundError } from "../errors/EntityNotFoundError";
import { Repository } from "../repository";

export class PrismaRepository implements Repository<Company, string> {
  prisma = new PrismaClient()

  async findAll(): Promise<Company[]> {
    return this.prisma.company.findMany()
  }
  async find(id: string): Promise<Company | null> {
    return this.prisma.company.findUnique({
      where: { id: id }
    })
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
    const result = await this.find(id)
    if (!result) {
      throw new NotFoundError()
    }

    return this.prisma.company.update({
      where: { id },
      data: company
    })
  }

  async delete(id: string): Promise<Company> {
    const result = await this.find(id)
    if (!result) {
      throw new CompanyNotFoundError()
    }

    return this.prisma.company.delete({
      where: { id }
    })
  }

}