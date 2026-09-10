import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "medium",
  fullScreen = true,
}: LoadingSpinnerProps) {
  const content = (
    <div className={`spinner-content ${size}`}>
      <div className="spinner-ring" />
    </div>
  );

  if (fullScreen) {
    return <div className="spinner-overlay">{content}</div>;
  }

  return <div className="spinner-wrapper">{content}</div>;
}