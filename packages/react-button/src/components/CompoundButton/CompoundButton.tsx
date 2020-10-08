import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { CompoundButtonProps } from './CompoundButton.types';
import { useCompoundButton } from './useCompoundButton';
import { useCompoundButtonClasses } from './useCompoundButtonClasses';

/**
 * Define a styled Button, using the `useCompoundButton` hook.
 */
export const CompoundButton = React.forwardRef<HTMLElement, CompoundButtonProps>((props, ref) => {
  const { render, state } = useCompoundButton(props, ref);

  useCompoundButtonClasses(state);
  useInlineTokens(state, '--button');

  return render(state);
});

CompoundButton.displayName = 'CompoundButton';
