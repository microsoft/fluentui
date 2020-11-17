import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { CompoundButtonProps } from './CompoundButton.types';
import { useCompoundButton } from './useCompoundButton';
import { useCompoundButtonClasses } from './useCompoundButtonClasses';

/**
 * Define a styled CompoundButton, using the `useCompoundButton` hook.
 * {@docCategory Button}
 */
export const CompoundButton = React.forwardRef<HTMLElement, CompoundButtonProps>((props, ref) => {
  const { render, state } = useCompoundButton(props, ref);

  useCompoundButtonClasses(state);
  useInlineTokens(state, '--button');

  return render(state);
});

CompoundButton.displayName = 'CompoundButton';
