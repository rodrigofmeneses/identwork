
import { Company } from "@prisma/client";
import { Repository } from "./repository";

export interface CompanyRepository extends Repository<Company, string> { }