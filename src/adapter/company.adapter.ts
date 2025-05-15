import { AirtableCompany, Company } from "@/models/companies.model";

export const companyAdapter = (company: AirtableCompany): Company => ({
  id: company.id,
  name: company["Company Name"],
  description: company.Description,
  languages: company.Languages,
  writingStyle: company["Writing style"],
  ID: company.ID,
});
