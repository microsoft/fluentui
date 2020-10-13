import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { CompoundButtonProps } from './CompoundButton.types';
import { useCompoundButton } from './useCompoundButton';
import { useCompoundButtonClasses } from './useCompoundButtonClasses';
import { renderCompoundButton } from './renderCompoundButton';
/**
 * Define a styled Button, using the `useCompoundButton` hook.
 */
export const CompoundButton = React.forwardRef<HTMLElement, CompoundButtonProps>((props, ref) => {
  const { state } = useCompoundButton(props, ref);

  useCompoundButtonClasses(state);
  useInlineTokens(state, '--button');

  return renderCompoundButton(state);
});

CompoundButton.displayName = 'CompoundButton';
