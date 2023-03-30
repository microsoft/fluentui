import * as React from 'react';
import { useSpinner_unstable } from './useSpinner';
import { renderSpinner_unstable } from './renderSpinner';
import { useSpinnerStyles_unstable } from './useSpinnerStyles';
import type { SpinnerProps } from './Spinner.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * Converged Spinner component for the fluentui repo
 */
export const Spinner: ForwardRefComponent<SpinnerProps> = React.forwardRef((props, ref) => {
  const state = useSpinner_unstable(props, ref);

  useSpinnerStyles_unstable(state);

  const { useSpinnerStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderSpinner_unstable(state);
});

Spinner.displayName = 'Spinner';
