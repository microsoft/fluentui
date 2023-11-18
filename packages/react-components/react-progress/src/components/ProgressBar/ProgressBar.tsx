import * as React from 'react';
import { useProgressBar_unstable } from './useProgressBar';
import { renderProgressBar_unstable } from './renderProgressBar';
import { useProgressBarStyles_unstable } from './useProgressBarStyles.styles';
import type { ProgressBarProps } from './ProgressBar.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * A ProgressBar bar shows the progression of a task.
 */
export const ProgressBar: ForwardRefComponent<ProgressBarProps> = React.forwardRef((props, ref) => {
  const state = useProgressBar_unstable(props, ref);

  useProgressBarStyles_unstable(state);

  useCustomStyleHook_unstable('useProgressBarStyles_unstable')(state);

  return renderProgressBar_unstable(state);
});

ProgressBar.displayName = 'ProgressBar';
