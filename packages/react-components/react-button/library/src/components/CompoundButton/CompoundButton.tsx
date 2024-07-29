import * as React from 'react';
import { renderCompoundButton_unstable } from './renderCompoundButton';
import { useCompoundButton_unstable } from './useCompoundButton';
import { useCompoundButtonStyles_unstable } from './useCompoundButtonStyles.styles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CompoundButtonProps } from './CompoundButton.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * CompoundButtons are buttons that can have secondary content that adds extra information to the user.
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const CompoundButton: ForwardRefComponent<CompoundButtonProps> = React.forwardRef((props, ref) => {
  const state = useCompoundButton_unstable(props, ref);

  useCompoundButtonStyles_unstable(state);

  useCustomStyleHook_unstable('useCompoundButtonStyles_unstable')(state);

  return renderCompoundButton_unstable(state);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<CompoundButtonProps>;

CompoundButton.displayName = 'CompoundButton';
