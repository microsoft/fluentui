import * as React from 'react';
import { useProgress_unstable } from './useProgress';
import { renderProgress_unstable } from './renderProgress';
import { useProgressStyles_unstable } from './useProgressStyles';
import type { ProgressProps } from './Progress.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Converged Progress component for v9's Fluent UI library
 */
export const Progress: ForwardRefComponent<ProgressProps> = React.forwardRef((props, ref) => {
  const state = useProgress_unstable(props, ref);

  useProgressStyles_unstable(state);
  return renderProgress_unstable(state);
});

Progress.displayName = 'Progress';
