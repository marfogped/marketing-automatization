import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AnalysisResultsProps {
  data: {
    title: string;
    description: string;
    mainContent: string;
    sentiment: string;
    keywords: string[];
    language: string;
  };
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{data.title}</h3>
        <p className="text-muted-foreground">{data.description}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Sentiment Analysis</h4>
        <p className="text-sm">{data.sentiment}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {data.keywords.map((keyword, index) => (
            <Badge key={index} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Main Content</h4>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <p className="text-sm whitespace-pre-wrap">{data.mainContent}</p>
        </ScrollArea>
      </div>

      <div className="flex justify-end">
        <Badge variant="outline">Language: {data.language}</Badge>
      </div>
    </Card>
  );
}
