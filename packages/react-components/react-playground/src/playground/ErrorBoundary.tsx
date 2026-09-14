import * as React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError: (error: Error) => void;
  /** Rendered instead of the children after an error was caught. */
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render errors thrown by playground code. Error boundaries have no hooks equivalent, so this has to be a class.
 * Remount it (via `key`) to reset after the code changes.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error): void {
    this.props.onError(error);
  }

  public render(): React.ReactNode {
    return this.state.hasError ? this.props.fallback ?? null : this.props.children;
  }
}
