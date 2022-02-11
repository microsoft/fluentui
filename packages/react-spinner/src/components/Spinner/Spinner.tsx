import * as React from 'react';
import { useSpinner_unstable } from './useSpinner';
import type { SpinnerProps } from './Spinner.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Converged Spinner component for the fluentui repo
 */
export const Spinner: ForwardRefComponent<SpinnerProps> = React.forwardRef((props, ref) => {
  const [state, render] = useSpinner_unstable(props, ref);
  return render(state);
});

Spinner.displayName = 'Spinner';
