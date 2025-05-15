import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Company {
  id: number;
  name: string;
  description: string;
  writingStyle: string;
  values: string[];
}

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/company/${company.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>{company.name}</CardTitle>
          <CardDescription>{company.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Writing Style</h4>
              <p className="text-sm text-muted-foreground">
                {company.writingStyle}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Company Values</h4>
              <div className="flex flex-wrap gap-2">
                {company.values.map((value) => (
                  <Badge key={value} variant="secondary">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
