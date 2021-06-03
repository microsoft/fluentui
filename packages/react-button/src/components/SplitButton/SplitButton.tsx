import * as React from 'react';
import { ChevronDownIcon } from '../../common/DefaultIcons';
import { Button } from '../Button/index';
import { MenuButton } from '../MenuButton/index';
import { SplitButtonProps, SplitButtonStyleSelectors } from './SplitButton.types';
import { renderSplitButton } from './renderSplitButton';
import { useSplitButton } from './useSplitButton';
import { useSplitButtonStyles } from './useSplitButtonStyles';

/**
 * Define a styled SplitButton, using the `useSplitButton` hook.
 * {@docCategory Button}
 */
export const SplitButton = React.forwardRef<HTMLElement, SplitButtonProps>((props, ref) => {
  const state = useSplitButton(props, ref, {
    button: { as: Button },
    menuButton: { as: MenuButton, icon: <ChevronDownIcon /> },
  });

  const styleSelectors: SplitButtonStyleSelectors = {
    disabled: state.disabled,
    // expanded: state.expanded,
    iconOnly: state.iconOnly,
    primary: state.primary,
    size: state.size,
    subtle: state.subtle,
    transparent: state.transparent,
  };

  useSplitButtonStyles(state, styleSelectors);

  return renderSplitButton(state);
});

SplitButton.displayName = 'SplitButton';
