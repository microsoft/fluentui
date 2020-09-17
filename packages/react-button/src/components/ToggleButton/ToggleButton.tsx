import * as React from 'react';
import { ToggleButtonProps } from './ToggleButton.types';
import { useToggleButton } from './useToggleButton';
import { useFocusRects } from '@uifabric/utilities';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useButtonClasses } from '../Button/useButtonClasses';
import { useToggleButtonClasses } from './useToggleButtonClasses';

/**
 * Define a styled Button, using the `createButton` factory.
 */
export const ToggleButton = React.forwardRef<HTMLElement, ToggleButtonProps>((props, ref) => {
  const { render, state } = useToggleButton(props, ref);

  useButtonClasses(state);
  useToggleButtonClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--button');

  return render(state);
});

ToggleButton.displayName = 'ToggleButton';
