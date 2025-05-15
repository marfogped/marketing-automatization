import { companyAdapter } from "@/adapter/company.adapter";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UrlInputForm } from "@/components/url-input-form";
import { getCompanybyId } from "@/lib/airtable";

export default async function CompanyPage({
  params,
}: {
  params: { id: string };
}) {
  const company = await getCompanybyId(params.id);
  const adaptedCompany = companyAdapter(company);

  if (!adaptedCompany) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Company not found</h1>
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{adaptedCompany.name}</h1>
            <div className="space-y-8">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Company Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Description</h3>
                    <p className="text-muted-foreground">
                      {adaptedCompany.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Writing Style</h3>
                    <p className="text-muted-foreground">
                      {adaptedCompany.writingStyle}
                    </p>
                  </div>
                  {/* <div>
                    <h3 className="text-sm font-medium mb-1">Company Values</h3>
                    <div className="flex flex-wrap gap-2">
                      {adaptedCompany.values.map((value) => (
                        <span
                          key={value}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div> */}
                  <div>
                    <h3 className="text-sm font-medium mb-1">
                      Available Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {adaptedCompany.languages.map((lang) => (
                        <span
                          key={lang}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <UrlInputForm
                companyId={adaptedCompany.ID}
                languages={adaptedCompany.languages}
              />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
