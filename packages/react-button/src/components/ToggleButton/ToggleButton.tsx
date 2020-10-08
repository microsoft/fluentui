import * as React from 'react';
import { ToggleButtonProps } from './ToggleButton.types';
import { useToggleButton } from './useToggleButton';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useToggleButtonClasses } from './useToggleButtonClasses';

/**
 * Define a styled Button, using the `createButton` factory.
 */
export const ToggleButton = React.forwardRef<HTMLElement, ToggleButtonProps>((props, ref) => {
  const { render, state } = useToggleButton(props, ref);

  useToggleButtonClasses(state);
  useInlineTokens(state, '--button');

  return render(state);
});

ToggleButton.displayName = 'ToggleButton';
