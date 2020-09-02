import * as React from 'react';
import { makeClasses } from '@fluentui/react-compose/lib/next/index';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useFocusRects } from '@uifabric/utilities';
import { useButtonClasses } from '../Button/Button';
import { CompoundButtonProps } from './CompoundButton.types';
import { useCompoundButton } from './useCompoundButton';
import * as classes from './CompoundButton.scss';

// Create a hook to resolve classnames.
export const useCompoundButtonClasses = makeClasses(classes);

/**
 * Define a styled Button, using the `useCompoundButton` hook.
 */
export const CompoundButton = React.forwardRef<HTMLElement, CompoundButtonProps>((props, ref) => {
  const { render, state } = useCompoundButton(props, ref);

  // Apply styling.
  useButtonClasses(state);
  useCompoundButtonClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--button');

  // Render component.
  return render(state);
});

CompoundButton.displayName = 'CompoundButton';
