import { Request, Response } from "express";
import 'express-async-errors';
import { CreateCompanySchema, UpdateCompanySchema } from "../schemas/company.schema";
import { CompanyService } from "../services/company.service";


export class CompanyController {
  private companyService: CompanyService
  constructor(
    service?: CompanyService
  ) {
    this.companyService = service ?? new CompanyService()
  }

  async create(req: Request, res: Response) {
    const body = req.body
    await CreateCompanySchema.parseAsync(body)

    const newCompany = await this.companyService.create(body)

    return res.status(201).json(newCompany)
  }

  async findAll(req: Request, res: Response) {
    const result = await this.companyService.findAll()
    return res.json(result)
  }

  async find(req: Request, res: Response) {
    const { id } = req.params

    const result = await this.companyService.find(id)
    return res.json(result)
  }

  async update(req: Request, res: Response) {
    const body = req.body
    const { id } = req.params
    await UpdateCompanySchema.parseAsync(body)

    const result = await this.companyService.update(id, body)
    return res.status(201).json(result)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const result = await this.companyService.delete(id)
    return res.json(result)
  }
}