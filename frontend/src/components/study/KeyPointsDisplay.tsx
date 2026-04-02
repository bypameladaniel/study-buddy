import React, { useMemo } from "react";
import { parseKeyPoints } from "../../LLMServices/parsers/keypointsParser";
import { dashboardColors } from "../../styles/colors";

interface KeyPointsDisplayProps {
  rawData: string;
}

const KeyPointsDisplay: React.FC<KeyPointsDisplayProps> = ({ rawData }) => {
  const parsedData = useMemo(() => parseKeyPoints(rawData), [rawData]);

  if (!parsedData) {
    return (
      <div style={{ color: dashboardColors.sectionTitle }}>
        {rawData}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", textAlign: "left", color: dashboardColors.sectionTitle }}>
      <h2
        style={{
          marginTop: 0,
          marginBottom: "12px",
          fontSize: "24px",
          color: dashboardColors.title, 
        }}
      >
        {parsedData.title}
      </h2>

      <p
        style={{
          marginBottom: "20px",
          fontSize: "16px",
          fontStyle: "italic",
          color: dashboardColors.subtitle, 
          opacity: 1, 
        }}
      >
        {parsedData.overview}
      </p>

      <ul style={{ paddingLeft: "24px", margin: 0 }}>
        {parsedData.keyPoints.map((point, index) => (
          <li
            key={index}
            style={{
              marginBottom: "12px",
              lineHeight: "1.5",
              color: dashboardColors.sectionTitle,
            }}
          >
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyPointsDisplay;