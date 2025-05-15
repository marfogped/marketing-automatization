import { AirtableCompany } from "@/models/companies.model";
import Airtable from "airtable";

const base = new Airtable({
  apiKey:
    process.env.AIRTABLE_API_KEY ||
    "pat3uUzpKpxgryQKS.05238ac4780a12a59db12a56acf4288809a4e96c72c6b99c5c686f8fda3661c9",
}).base(process.env.AIRTABLE_BASE_ID || "app0zwG1HhT94sG8q");

export async function getRecords(tableName: string) {
  try {
    const records = await base(tableName).select({}).all();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    })) as AirtableCompany[];
  } catch (error) {
    console.error("Error fetching records from Airtable:", error);
    throw error;
  }
}

export async function getCompanybyId(companyId: string) {
  try {
    const record = await base("Companies").find(companyId);
    return {
      id: record.id,
      ...record.fields,
    } as AirtableCompany;
  } catch (error) {
    console.error("Error fetching record from Airtable:", error);
    throw error;
  }
}
