import * as React from 'react';
import { useSpinner } from './useSpinner';
import { renderSpinner } from './renderSpinner';
import { useSpinnerStyles } from './useSpinnerStyles';
import type { SpinnerProps } from './Spinner.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Spinner component
 */
export const Spinner: ForwardRefComponent<SpinnerProps> = React.forwardRef((props, ref) => {
  const state = useSpinner(props, ref);

  useSpinnerStyles(state);
  return renderSpinner(state);
});

Spinner.displayName = 'Spinner';
