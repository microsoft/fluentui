'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderProgressBar, useProgressBar } from '@fluentui/react-headless-components-preview/progress-bar';

import type { ProgressBarProps, ProgressBarState } from './ProgressBar.types';
import { useProgressBarStyles } from './useProgressBarStyles';

/**
 * A ProgressBar shows the completion of a task. Windmod ProgressBar: the headless progress bar
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ProgressBar: ForwardRefComponent<ProgressBarProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-progress's styled useProgressBar, except `color`, whose
  // Griffel default is derived from the Field validation state headless does not expose.
  const { color = 'brand', shape = 'rounded', thickness = 'medium', ...rest } = props;

  const state: ProgressBarState = {
    ...useProgressBar(rest, ref),
    color,
    shape,
    thickness,
  };

  return renderProgressBar(useProgressBarStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<ProgressBarProps>;

ProgressBar.displayName = 'ProgressBar';
