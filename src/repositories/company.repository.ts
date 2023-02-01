import { Company } from "../entities/company";
import { Repository } from "./repository";

export interface CompanyRepository extends Repository<Company, string> { }