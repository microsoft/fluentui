'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SpinnerProps } from './Spinner.types';
import { useSpinner } from './useSpinner';
import { renderSpinner } from './renderSpinner';

/**
 * A spinner component for loading indicators.
 */
export const Spinner: ForwardRefComponent<SpinnerProps> = React.forwardRef((props, ref) => {
  const state = useSpinner(props, ref);

  return renderSpinner(state);
});

Spinner.displayName = 'Spinner';
