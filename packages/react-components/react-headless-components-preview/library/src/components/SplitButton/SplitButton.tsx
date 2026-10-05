'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SplitButtonProps } from './SplitButton.types';
import { useSplitButton } from './useSplitButton';
import { renderSplitButton } from './renderSplitButton';

/**
 * SplitButtons are a grouping of two interactive surfaces where interacting with the first one triggers a primary
 * action, while interacting with the second one opens a menu with secondary actions.
 */
export const SplitButton: ForwardRefComponent<SplitButtonProps> = React.forwardRef((props, ref) => {
  const state = useSplitButton(props, ref);

  return renderSplitButton(state);
});

SplitButton.displayName = 'SplitButton';
