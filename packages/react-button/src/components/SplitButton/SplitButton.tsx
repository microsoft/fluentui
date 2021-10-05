import * as React from 'react';
import { renderSplitButton } from './renderSplitButton';
import { useSplitButton } from './useSplitButton';
import { useSplitButtonStyles } from './useSplitButtonStyles';
import type { SplitButtonProps } from './SplitButton.types';
import { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * SplitButtons are a grouping of two interactive surfaces where the interacting with the first one triggers a primary
 * action, while interacting with the second one opens a menu with secondary actions.
 */
export const SplitButton: ForwardRefComponent<SplitButtonProps> = React.forwardRef((props, ref) => {
  const state = useSplitButton(props, ref);

  useSplitButtonStyles(state);

  return renderSplitButton(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<SplitButtonProps>;

SplitButton.displayName = 'SplitButton';
