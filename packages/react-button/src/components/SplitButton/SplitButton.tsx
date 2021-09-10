import * as React from 'react';
import { Button } from '../Button/index';
import { MenuButton } from '../MenuButton/index';
import { renderSplitButton } from './renderSplitButton';
import { useSplitButton } from './useSplitButton';
import { useSplitButtonStyles } from './useSplitButtonStyles';
import type { SplitButtonProps } from './SplitButton.types';

/**
 * Define a styled SplitButton, using the `useSplitButton` hook.
 * {@docCategory Button}
 */
export const SplitButton = React.forwardRef<HTMLElement, SplitButtonProps>((props, ref) => {
  const state = useSplitButton(props, ref, {
    button: { as: Button },
    menuButton: { as: MenuButton },
  });

  useSplitButtonStyles(state);

  return renderSplitButton(state);
});

SplitButton.displayName = 'SplitButton';
