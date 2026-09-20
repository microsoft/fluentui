'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useSpinner } from './useSpinner';
import { renderSpinner } from './renderSpinner';
import { useSpinnerStyles } from './useSpinnerStyles.styles';
import type { SpinnerProps } from './Spinner.types';

/**
 * A spinner indicates that progress is being made on an indeterminate operation.
 */
export const Spinner: ForwardRefComponent<SpinnerProps> = React.forwardRef<HTMLElement, SpinnerProps>((props, ref) => {
  const state = useSpinner(props, ref);

  useSpinnerStyles(state);

  return renderSpinner(state);
});

Spinner.displayName = 'Spinner';
