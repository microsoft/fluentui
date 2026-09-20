'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CompoundButtonProps } from './CompoundButton.types';
import { renderCompoundButton } from './renderCompoundButton';
import { useCompoundButton } from './useCompoundButton';
import { useCompoundButtonStyles } from './useCompoundButtonStyles.styles';

export const CompoundButton: ForwardRefComponent<CompoundButtonProps> = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  CompoundButtonProps
>((props, ref) => {
  const state = useCompoundButton(props, ref);
  useCompoundButtonStyles(state);
  return renderCompoundButton(state);
});

CompoundButton.displayName = 'CompoundButton';
