import { AppSidebar } from "@/components/app-sidebar";
import { CompanyCard } from "@/components/company-card";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { companies } from "@/lib/constants";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="min-h-screen bg-background">
          <SiteHeader />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Companies</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(companies).map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
