import * as React from 'react';
import { CompoundButtonProps, CompoundButtonStyleSelectors } from './CompoundButton.types';
import { renderCompoundButton } from './renderCompoundButton';
import { useCompoundButton } from './useCompoundButton';
import { useCompoundButtonStyles } from './useCompoundButtonStyles';

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
    iconOnly: receivedIcon && !receivedChildren,
    primary: state.primary,
    size: state.size,
  };

  useCompoundButtonStyles(state, styleSelectors);

  return renderCompoundButton(state);
});

CompoundButton.displayName = 'CompoundButton';
