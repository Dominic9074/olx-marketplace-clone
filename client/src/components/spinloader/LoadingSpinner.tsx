
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "medium",
  message,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const content = (
    <div className={`spinner-content ${size}`}>
      <div className="spinner-ring" />
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="spinner-overlay">{content}</div>;
  }

  return <div className="spinner-wrapper">{content}</div>;
}