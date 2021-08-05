import * as React from 'react';
import { CompoundButtonProps } from './CompoundButton.types';
import { renderCompoundButton } from './renderCompoundButton';
import { useCompoundButton } from './useCompoundButton';
import { useCompoundButtonStyles } from './useCompoundButtonStyles';

/**
 * Define a styled CompoundButton, using the `useCompoundButton` hook.
 * {@docCategory Button}
 */
export const CompoundButton = React.forwardRef<HTMLElement, CompoundButtonProps>((props, ref) => {
  const state = useCompoundButton(props, ref);

  useCompoundButtonStyles(state);

  return renderCompoundButton(state);
});

CompoundButton.displayName = 'CompoundButton';
