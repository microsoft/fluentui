import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import { renderSplitButton_unstable } from './renderSplitButton';
import type { SplitButtonProps, SplitButtonState, SplitButtonRender } from './SplitButton.types';
import { useSplitButtonStyles_unstable } from './useSplitButtonStyles';

/**
 * Given user props, defines default props for the SplitButton and returns processed state.
 * @param props - User provided props to the SplitButton component.
 * @param ref - User provided ref to be passed to the SplitButton component.
 */
export const useSplitButton_unstable = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): [SplitButtonState, SplitButtonRender] => {
  const {
    appearance,
    block = false,
    children,
    disabled = false,
    disabledFocusable = false,
    icon,
    iconPosition = 'before',
    menuButton,
    primaryActionButton,
    shape = 'rounded',
    size = 'medium',
  } = props;
  const menuButtonShorthand = resolveShorthand(menuButton, {
    defaultProps: {
      appearance,
      disabled,
      disabledFocusable,
      shape,
      size,
    },
  });
  const primaryActionButtonShorthand = resolveShorthand(primaryActionButton, {
    defaultProps: {
      appearance,
      block,
      children,
      disabled,
      disabledFocusable,
      icon,
      iconPosition,
      shape,
      size,
    },
  });

  const state: SplitButtonState = {
    // Props passed at the top-level
    appearance,
    block,
    disabled,
    disabledFocusable,
    iconPosition,
    shape,
    size,

    // Slots definition
    components: {
      root: 'div',
      menuButton: MenuButton,
      primaryActionButton: Button,
    },

    root: getNativeElementProps('div', { ref, ...props }),
    menuButton: menuButtonShorthand,
    primaryActionButton: primaryActionButtonShorthand,
  };

  useSplitButtonStyles_unstable(state);

  return [state, renderSplitButton_unstable];
};
