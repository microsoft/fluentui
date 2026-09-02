'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSpinner, useSpinner } from '@fluentui/react-headless-components-preview/spinner';

import type { SpinnerProps } from './Spinner.types';
import { useSpinnerStyles } from './useSpinnerStyles';

/**
 * A Spinner is an animated loading indicator. Windmod Spinner: the headless spinner
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Spinner: ForwardRefComponent<SpinnerProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-spinner's styled useSpinner.
  ({ appearance = 'primary', size = 'medium', ...rest }, ref) => {
    return renderSpinner(
      useSpinnerStyles({
        ...useSpinner(rest, ref),
        appearance,
        size,
      }),
    );
  },
);

Spinner.displayName = 'Spinner';
