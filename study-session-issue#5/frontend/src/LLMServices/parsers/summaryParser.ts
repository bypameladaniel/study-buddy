

export interface SummarySection {
  heading: string;
  content: string;
}

export interface StudySummary {
  title: string;
  sections: SummarySection[];
}
export function parseSummary(rawResponse: string): StudySummary | null {
  if (!rawResponse || typeof rawResponse !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(rawResponse);

    if (
      !parsed ||
      typeof parsed.title !== "string" ||
      !Array.isArray(parsed.sections)
    ) {
      return null;
    }

    const cleanSections = parsed.sections
      .filter(
        (section: any) =>
          section &&
          typeof section.heading === "string" &&
          typeof section.content === "string"
      )
      .map((section: any) => ({
        heading: section.heading.trim(),
        content: section.content.trim(),
      }));

    return {
      title: parsed.title.trim(),
      sections: cleanSections,
    };
  } catch (error) {
    console.error("Failed to parse summary:", error);
    return null;
  }
}