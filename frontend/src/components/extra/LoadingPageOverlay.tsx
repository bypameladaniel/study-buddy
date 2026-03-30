import { useEffect, useState } from "react";

interface Props {
  text?: string;
}

export default function LoadingOverlay({ text = "Loading..." }: Props) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 300);

    return () => clearTimeout(showTimer);
  }, []);

  //prevents rendering until delay passes
  if (!visible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-card">
        <div className="loading-spinner" />
        <p className="loading-text">{text}</p>
      </div>
    </div>
  );
}