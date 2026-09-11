import * as React from 'react';
import { FluentProvider, mergeClasses, type Theme } from '@fluentui/react-components';

import { ErrorBoundary } from './ErrorBoundary';
import { usePreviewStyles } from './Preview.styles';
import type { PlaygroundComponent } from './runner';

export interface PreviewProps {
  component: PlaygroundComponent | null;
  /** Changing the key remounts the rendered component (resets state and the error boundary). */
  runId: number;
  theme: Theme;
  onError: (error: Error) => void;
  /** Rendered while there is no component yet (first compilation, nothing compiled successfully) or after it crashed. */
  placeholder?: React.ReactNode;
  className?: string;
}

export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const { component: Component, runId, theme, onError, placeholder, className } = props;
  const styles = usePreviewStyles();

  return (
    <FluentProvider ref={ref} theme={theme} className={mergeClasses(styles.root, className)}>
      {Component ? (
        <ErrorBoundary key={runId} onError={onError} fallback={placeholder}>
          <Component />
        </ErrorBoundary>
      ) : (
        placeholder
      )}
    </FluentProvider>
  );
});

Preview.displayName = 'Preview';
