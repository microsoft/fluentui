import * as React from 'react';
import { useProgress_unstable } from './useProgress';
import { renderProgress_unstable } from './renderProgress';
import { useProgressStyles_unstable } from './useProgressStyles';
import type { ProgressProps } from './Progress.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Progress component - TODO: add more docs
 */
export const Progress: ForwardRefComponent<ProgressProps> = React.forwardRef((props, ref) => {
  const state = useProgress_unstable(props, ref);

  useProgressStyles_unstable(state);
  return renderProgress_unstable(state);
});

Progress.displayName = 'Progress';
