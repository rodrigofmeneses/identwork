import express from 'express'
import { EmployeeController } from '../controllers/employee.controller'

const router = express.Router()

const employeeController = new EmployeeController()

router.get('/', employeeController.findAll.bind(employeeController))
router.get('/:id', employeeController.find.bind(employeeController))
router.post('/', employeeController.create.bind(employeeController))
router.put('/:id', employeeController.update.bind(employeeController))
router.patch('/:id/print', employeeController.print.bind(employeeController))
router.delete('/:id', employeeController.delete.bind(employeeController))

export default router