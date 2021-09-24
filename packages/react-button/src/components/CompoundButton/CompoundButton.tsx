import * as React from 'react';
import { renderCompoundButton } from './renderCompoundButton';
import { useCompoundButton } from './useCompoundButton';
import { useCompoundButtonStyles } from './useCompoundButtonStyles';
import type { CompoundButtonProps } from './CompoundButton.types';

/**
 * CompoundButtons are buttons that can have secondary content that adds extra information to the user.
 */
export const CompoundButton: React.FunctionComponent<CompoundButtonProps> = React.forwardRef<
  HTMLButtonElement,
  CompoundButtonProps
>((props, ref) => {
  const state = useCompoundButton(props, ref);

  useCompoundButtonStyles(state);

  return renderCompoundButton(state);
});

CompoundButton.displayName = 'CompoundButton';
