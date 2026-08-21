'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSpinner, useSpinner } from '@fluentui/react-headless-components-preview/spinner';

import type { SpinnerProps, SpinnerState } from './Spinner.types';
import { useSpinnerStyles } from './useSpinnerStyles';

/**
 * A Spinner is an animated loading indicator. Windmod Spinner: the headless spinner
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Spinner: ForwardRefComponent<SpinnerProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-spinner's styled useSpinner.
  const { appearance = 'primary', size = 'medium', ...rest } = props;

  const state: SpinnerState = {
    ...useSpinner(rest, ref),
    appearance,
    size,
  };

  return renderSpinner(useSpinnerStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<SpinnerProps>;

Spinner.displayName = 'Spinner';
