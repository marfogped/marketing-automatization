import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";

export const stagehandConfig = {
  env: "BROWSERBASE" as const,
  apiKey: process.env.BROWSERBASE_API_KEY,
  projectId: process.env.BROWSERBASE_PROJECT_ID,
  verbose: 1 as const,
};

export async function analyzeWebsite(url: string, language: string) {
  const stagehand = new Stagehand(stagehandConfig);
  await stagehand.init();

  try {
    const page = stagehand.page;

    // Navigate to the website
    await page.goto(url);

    // Extract main content and metadata
    const { title, description, mainContent } = await page.extract({
      instruction:
        "Extract the main title, meta description, and main content of the page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        mainContent: z.string(),
      }),
      useTextExtract: true,
    });

    // Analyze the content
    const { sentiment, keywords } = await page.extract({
      instruction:
        "Analyze the sentiment and extract key keywords from the content",
      schema: z.object({
        sentiment: z.string(),
        keywords: z.array(z.string()),
      }),
    });

    return {
      title,
      description,
      mainContent,
      sentiment,
      keywords,
      language,
    };
  } finally {
    await stagehand.close();
  }
}
