import express from 'express'
import { CompanyController } from '../controllers/company.controller'

const router = express.Router()

const companyController = new CompanyController()

router.get('/', companyController.findAll.bind(companyController))
router.get('/:id', companyController.find.bind(companyController))
router.post('/', companyController.create.bind(companyController))
router.put('/:id', companyController.update.bind(companyController))
router.delete('/:id', companyController.delete.bind(companyController))

export default router