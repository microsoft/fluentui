import * as React from 'react';
import { Button } from '../Button/index';
import { MenuButton } from '../MenuButton/index';
import { renderSplitButton } from './renderSplitButton';
import { useSplitButton } from './useSplitButton';
import { useSplitButtonStyles } from './useSplitButtonStyles';
import type { SplitButtonProps } from './SplitButton.types';

/**
 * SplitButtons are a grouping of two interactive surfaces where the interacting with the first one triggers a primary
 * action, while interacting with the second one opens a menu with secondary actions.
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
