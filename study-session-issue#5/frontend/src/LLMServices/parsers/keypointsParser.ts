export interface StudyKeyPointSet {
  title: string;
  overview: string;
  keyPoints: string[];
}

export function parseKeyPoints(rawResponse: string): StudyKeyPointSet | null {
  if (!rawResponse || typeof rawResponse !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(rawResponse);

    if (
      !parsed ||
      typeof parsed.title !== "string" ||
      typeof parsed.overview !== "string" ||
      !Array.isArray(parsed.keyPoints)
    ) {
      return null;
    }

    const cleanKeyPoints: string[] = parsed.keyPoints
      .filter(
        (point: any) => typeof point === "string" && point.trim().length > 0
      )
      .map((point: string) => point.trim());

    return {
      title: parsed.title.trim(),
      overview: parsed.overview.trim(),
      keyPoints: cleanKeyPoints,
    };
  } catch (error) {
    console.error("Failed to parse key points:", error);
    return null;
  }
}