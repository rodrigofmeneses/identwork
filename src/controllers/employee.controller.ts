import { Request, Response } from "express";
import 'express-async-errors';
import { CreateEmployeeSchema } from "../schemas/employee.schema";
import { EmployeeService } from "../services/employee.service";


export class EmployeeController {
  private employeeService: EmployeeService
  constructor(
    service?: EmployeeService
  ) {
    this.employeeService = service ?? new EmployeeService()
  }

  async create(req: Request, res: Response) {
    const validBody = await CreateEmployeeSchema.parseAsync(req.body)

    const result = await this.employeeService.create(validBody)
    return res.status(201).json(result)
  }

  async findAll(req: Request, res: Response) {
    return res.json(await this.employeeService.findAll())
  }

  async find(req: Request, res: Response) {
    const { id } = req.params

    const result = await this.employeeService.find(id)
    return res.json(result)
  }

  async findAllEmployeesToPrint(req: Request, res: Response) {
    return res.json(await this.employeeService.findAllEmployeesToPrint())
  }

  async update(req: Request, res: Response) {
    const validBody = await CreateEmployeeSchema.parseAsync(req.body)
    const { id } = req.params

    const result = await this.employeeService.update(id, validBody)
    res.json(result)
  }

  async print(req: Request, res: Response) {
    const { id } = req.params

    const result = await this.employeeService.print(id)
    res.json(result)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const result = await this.employeeService.delete(id)
    res.json(result)
  }
}