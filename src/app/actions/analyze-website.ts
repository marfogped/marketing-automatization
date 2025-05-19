"use server";

import { analyzeWebsite } from "@/lib/stagehand";

export async function analyzeWebsiteAction(url: string, language: string) {
  try {
    const result = await analyzeWebsite(url, language);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error analyzing website:", error);
    return { success: false, error: "Failed to analyze website" };
  }
}
