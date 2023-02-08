import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";

interface CreateCompanyRequest {
  id?: string
  name: string
}

interface UpdateCompanyRequest {
  name?: string
}

export class CompanyController {
  private companyService: CompanyService
  constructor(
    service?: CompanyService
  ) {
    this.companyService = service ?? new CompanyService()
  }

  async create(req: Request, res: Response) {
    try {
      const validBody: CreateCompanyRequest = req.body

      const newCompany = await this.companyService.create(validBody)

      return res.status(201).json(newCompany)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const result = await this.companyService.readAll()
      res.json(result)
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async read(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await this.companyService.read(id)
      res.json(result)
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const validBody: UpdateCompanyRequest = req.body
      const { id } = req.params
      const result = await this.companyService.update(id, validBody)
      res.json(result)
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await this.companyService.delete(id)
      res.json(result)
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}