import React, { useMemo } from "react";
import { parseSummary } from "../../LLMServices/parsers/summaryParser";
import { dashboardColors } from "../../styles/colors";

interface SummaryDisplayProps {
  rawData: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ rawData }) => {
  const parsedData = useMemo(() => parseSummary(rawData), [rawData]);

  if (!parsedData) {
    return (
      <div style={{ color: dashboardColors.sectionTitle, width: "100%" }}>
        {rawData}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        textAlign: "left",
        color: dashboardColors.sectionTitle,
      }}
    >
      {/* Title */}
      <h2
        style={{
          marginTop: 0,
          marginBottom: "16px",
          fontSize: "26px",
          color: dashboardColors.title,
        }}
      >
        {parsedData.title}
      </h2>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {parsedData.sections.map((section, index) => (
          <div
            key={index}
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              backgroundColor: dashboardColors.cardBackground,
              border: `1px solid ${dashboardColors.cardBorder}`,
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "18px",
                color: dashboardColors.subtitle,
              }}
            >
              {section.heading}
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: "16px",
                lineHeight: "1.6",
                color: dashboardColors.sectionTitle,
              }}
            >
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryDisplay;