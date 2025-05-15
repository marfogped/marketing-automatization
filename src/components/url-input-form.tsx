"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languageNames, type Language } from "@/lib/constants";

interface UrlInputFormProps {
  companyId: number;
  languages: Language[];
}

export function UrlInputForm({ companyId, languages }: UrlInputFormProps) {
  const [url, setUrl] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0]
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would implement the actual API call to your backend
      // that triggers the Stagehand bot and N8N workflow
      console.log(
        "Processing URL:",
        url,
        "for company:",
        companyId,
        "in language:",
        selectedLanguage
      );

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form
      setUrl("");
    } catch (error) {
      console.error("Error processing URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Analyze Website</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <Input
            type="url"
            placeholder="Enter website URL to analyze..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1"
          />
          <Select
            value={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value as Language)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {languageNames[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Analyze"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
