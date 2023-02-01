import { Employee } from "../entities/employee";
import { Repository } from "./repository";

export interface EmployeeRepository extends Repository<Employee, string> { }