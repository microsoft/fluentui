import * as React from 'react';
import { renderSplitButton_unstable } from './renderSplitButton';
import { useSplitButton_unstable } from './useSplitButton';
import { useSplitButtonStyles_unstable } from './useSplitButtonStyles.styles';
import type { SplitButtonProps } from './SplitButton.types';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * SplitButtons are a grouping of two interactive surfaces where interacting with the first one triggers a primary
 * action, while interacting with the second one opens a menu with secondary actions.
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const SplitButton: ForwardRefComponent<SplitButtonProps> = React.forwardRef((props, ref) => {
  const state = useSplitButton_unstable(props, ref);

  useSplitButtonStyles_unstable(state);

  useCustomStyleHook_unstable('useSplitButtonStyles_unstable')(state);

  return renderSplitButton_unstable(state);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<SplitButtonProps>;

SplitButton.displayName = 'SplitButton';
