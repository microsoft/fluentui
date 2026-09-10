import * as React from 'react';
import { FluentProvider, makeStyles, mergeClasses, tokens, type Theme } from '@fluentui/react-components';

import { ErrorBoundary } from './ErrorBoundary';
import type { PlaygroundComponent } from './runner';

export interface PreviewProps {
  component: PlaygroundComponent | null;
  /** Changing the key remounts the rendered component (resets state and the error boundary). */
  runId: number;
  theme: Theme;
  onError: (error: Error) => void;
  className?: string;
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    minHeight: 0,
    overflow: 'auto',
    boxSizing: 'border-box',
    padding: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const { component: Component, runId, theme, onError, className } = props;
  const styles = useStyles();

  return (
    <FluentProvider ref={ref} theme={theme} className={mergeClasses(styles.root, className)}>
      {Component ? (
        <ErrorBoundary key={runId} onError={onError}>
          <Component />
        </ErrorBoundary>
      ) : null}
    </FluentProvider>
  );
});

Preview.displayName = 'Preview';
