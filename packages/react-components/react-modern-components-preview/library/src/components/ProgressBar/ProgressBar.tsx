'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderProgressBar } from './renderProgressBar';
import { useProgressBar } from './useProgressBar';
import { useProgressBarStyles } from './useProgressBarStyles.styles';
import type { ProgressBarProps } from './ProgressBar.types';

/**
 * ProgressBar gives visual feedback for the status of a task.
 */
export const ProgressBar: ForwardRefComponent<ProgressBarProps> = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (props, ref) => {
    const state = useProgressBar(props, ref);

    useProgressBarStyles(state);

    return renderProgressBar(state);
  },
);

ProgressBar.displayName = 'ProgressBar';
