import * as React from 'react';
import { renderCompoundButton } from './renderCompoundButton';
import { useCompoundButton } from './useCompoundButton';
import { useCompoundButtonStyles } from './useCompoundButtonStyles';
import type { CompoundButtonProps } from './CompoundButton.types';

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
