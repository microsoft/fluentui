'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderProgressBar, useProgressBar } from '@fluentui/react-headless-components-preview/progress-bar';
import { useFieldContext } from '@fluentui/react-headless-components-preview/field';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { ProgressBarColor, ProgressBarProps, ProgressBarState } from './ProgressBar.types';
import { useProgressBarStyles } from './useProgressBarStyles';

/**
 * A ProgressBar shows the completion of a task. Windmod ProgressBar: the headless progress bar
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ProgressBar: ForwardRefComponent<ProgressBarProps> = React.forwardRef((props, ref) => {
  // Griffel derives ProgressBar's default colour from the surrounding Field's validation state:
  // `color = fieldState === 'error' || fieldState === 'warning' || fieldState === 'success' ?
  // fieldState : 'brand'` (react-progress useProgressBar.tsx:26-30). The three names are shared
  // between the two unions; every other validation state (including `'none'`) contributes nothing
  // and leaves the destructuring default in charge, which is what Griffel's `: 'brand'` branch does.
  const validationState = useFieldContext()?.validationState;
  const contextColor: ProgressBarColor | undefined =
    validationState === 'error' || validationState === 'warning' || validationState === 'success'
      ? validationState
      : undefined;

  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-progress's styled useProgressBar.
  const {
    color = 'brand',
    shape = 'rounded',
    thickness = 'medium',
    ...rest
  } = mergeContextProps({ color: contextColor }, props);

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
