"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { analyzeWebsiteAction } from "@/app/actions/analyze-website";
import { toast } from "sonner";
import { AnalysisResults } from "./analysis-results";

interface UrlInputFormProps {
  companyId: number;
  languages: string[];
}

export function UrlInputForm({ companyId, languages }: UrlInputFormProps) {
  const [url, setUrl] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languages[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAnalysisResults(null);

    try {
      const result = await analyzeWebsiteAction(url, selectedLanguage);

      if (result.success) {
        toast.success("Website analyzed successfully!");
        setAnalysisResults(result.data);
      } else {
        toast.error(result.error || "Failed to analyze website");
      }

      setUrl("");
    } catch (error) {
      console.error("Error processing URL:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleN8NSubmit = async () => {
    if (!analysisResults) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            analysis: analysisResults,
            timestamp: new Date().toISOString(),
          }),
          mode: "cors",
          credentials: "omit",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Analysis results sent successfully!");

      const closeButton = document.querySelector(
        '[data-state="open"] button[aria-label="Close"]'
      );
      if (closeButton instanceof HTMLElement) {
        closeButton.click();
      }
    } catch (error) {
      console.error("Error sending to N8N:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send analysis results"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
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
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
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

      {analysisResults && (
        <>
          <AnalysisResults data={analysisResults} />
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send to Email
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Submission</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to send this analysis to generate an
                    email?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleN8NSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Confirm & Send"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}
