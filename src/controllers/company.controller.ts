import { Request, Response } from "express";
import 'express-async-errors';
import { CreateCompanyRequest, CreateCompanySchema, UpdateCompanyRequest, UpdateCompanySchema } from "../schemas/company.schema";
import { CompanyService } from "../services/company.service";
import { NotFoundError } from "../shared/api-errors";


export class CompanyController {
  private companyService: CompanyService
  constructor(
    service?: CompanyService
  ) {
    this.companyService = service ?? new CompanyService()
  }

  async create(req: Request, res: Response) {
    const validBody: CreateCompanyRequest = req.body
    await CreateCompanySchema.parseAsync(validBody)

    const newCompany = await this.companyService.create(validBody)
    return res.status(201).json(newCompany)
  }

  async findAll(req: Request, res: Response) {
    const result = await this.companyService.findAll()
    res.json(result)
  }

  async find(req: Request, res: Response) {
    const { id } = req.params
    const result = await this.companyService.find(id)

    if (!await this.companyService.find(id)) {
      throw new NotFoundError('Company not found')
    }
    res.json(result)
  }

  async update(req: Request, res: Response) {
    const validBody: UpdateCompanyRequest = req.body
    const { id } = req.params

    await UpdateCompanySchema.parseAsync(validBody)

    if (!await this.companyService.find(id)) {
      throw new NotFoundError('Company not found')
    }
    const result = await this.companyService.update(id, validBody)
    res.json(result)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    if (!await this.companyService.find(id)) {
      throw new NotFoundError('Company not found')
    }

    const result = await this.companyService.delete(id)
    res.json(result)
  }
}