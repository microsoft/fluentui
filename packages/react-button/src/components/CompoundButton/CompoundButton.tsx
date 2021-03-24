import * as React from 'react';
import { CompoundButtonProps, CompoundButtonStyleSelectors } from './CompoundButton.types';
import { useCompoundButton } from './useCompoundButton';
import { useCompoundButtonStyles } from './useCompoundButtonStyles';
import { renderCompoundButton } from './renderCompoundButton';

/**
 * Define a styled CompoundButton, using the `useCompoundButton` hook.
 * {@docCategory Button}
 */
export const CompoundButton = React.forwardRef<HTMLElement, CompoundButtonProps>((props, ref) => {
  const state = useCompoundButton(props, ref);

  const receivedChildren = !!state.children?.children;
  const receivedIcon = !!state.icon?.children;

  const styleSelectors: CompoundButtonStyleSelectors = {
    disabled: state.disabled,
    primary: state.primary,
    iconOnly: receivedIcon && !receivedChildren,
    size: state.size,
  };

  useCompoundButtonStyles(state, styleSelectors);

  return renderCompoundButton(state);
});

CompoundButton.displayName = 'CompoundButton';
