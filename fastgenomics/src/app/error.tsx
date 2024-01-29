"use client";

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div>
      <h1>{error.message}</h1>
      <button onClick={reset}>Try Again</button>
    </div>
  );
};

export default ErrorBoundary;
