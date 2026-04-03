import React, { useMemo } from "react";
import { parseKeyPoints } from "../../LLMServices/parsers/keypointsParser";
import { StudySessionColors } from "../../styles/colors";

interface KeyPointsDisplayProps {
  rawData: string;
}

const KeyPointsDisplay: React.FC<KeyPointsDisplayProps> = ({ rawData }) => {
  const parsedData = useMemo(() => parseKeyPoints(rawData), [rawData]);

  if (!parsedData) {
    return (
      <div style={{ color: StudySessionColors.sectionTitle }}>
        {rawData}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", textAlign: "left", color: StudySessionColors.sectionTitle }}>
      <h2
        style={{
          marginTop: 0,
          marginBottom: "12px",
          fontSize: "24px",
          color: StudySessionColors.title, 
        }}
      >
        {parsedData.title}
      </h2>

      <p
        style={{
          marginBottom: "20px",
          fontSize: "16px",
          fontStyle: "italic",
          color: StudySessionColors.subtitle, 
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
              color: StudySessionColors.sectionTitle,
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