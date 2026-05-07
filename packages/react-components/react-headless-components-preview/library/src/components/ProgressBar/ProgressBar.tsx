'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useProgressBar } from './useProgressBar';
import { renderProgressBar } from './renderProgressBar';
import type { ProgressBarProps } from './ProgressBar.types';

/**
 * ProgressBar component - TODO: add more docs
 */
export const ProgressBar: ForwardRefComponent<ProgressBarProps> = React.forwardRef((props, ref) => {
  const state = useProgressBar(props, ref);

  return renderProgressBar(state);
});

ProgressBar.displayName = 'ProgressBar';
