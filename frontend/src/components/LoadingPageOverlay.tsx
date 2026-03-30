interface LoadingOverlayProps {
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingOverlay({ text = "Loading..." }: LoadingOverlayProps) {
  return (
    <div className="loading-overlay">
      <div className="loading-card">
        <div className="loading-spinner" />
        <p className="loading-text">{text}</p>
      </div>
    </div>
  );
}