"use client";

import { companyAdapter } from "@/adapter/company.adapter";
import { AppSidebar } from "@/components/app-sidebar";
import { CompanyCard } from "@/components/company-card";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getRecords } from "@/lib/airtable";
import { Company } from "@/models/companies.model";
import { useEffect, useState } from "react";

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const records = await getRecords("Companies");
      const adaptedCompanies = records.map(companyAdapter);
      setCompanies(adaptedCompanies);
    };
    fetchCompanies();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="min-h-screen bg-background">
          <SiteHeader />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Companies</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies &&
                companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
