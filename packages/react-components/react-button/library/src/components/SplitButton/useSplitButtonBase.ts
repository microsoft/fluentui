import * as React from 'react';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import type { SplitButtonBaseProps, SplitButtonBaseState } from './SplitButton.types';

/**
 * Given user props, defines default props for the SplitButton and returns processed state.
 * @param props - User provided props to the SplitButton component.
 * @param ref - User provided ref to be passed to the SplitButton component.
 */
export const useSplitButtonBase_unstable = (
  props: SplitButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): SplitButtonBaseState => {
  const {
    children,
    disabled = false,
    disabledFocusable = false,
    icon,
    iconPosition = 'before',
    menuButton,
    menuIcon,
    primaryActionButton,
  } = props;
  const baseId = useId('splitButton-');

  const menuButtonShorthand = slot.optional(menuButton, {
    defaultProps: {
      disabled,
      disabledFocusable,
      menuIcon,
    },
    renderByDefault: true,
    elementType: MenuButton,
  });
  const primaryActionButtonShorthand = slot.optional(primaryActionButton, {
    defaultProps: {
      children,
      disabled,
      disabledFocusable,
      icon,
      iconPosition,
      id: baseId + '__primaryActionButton',
    },
    renderByDefault: true,
    elementType: Button,
  });

  // Resolve menu button's aria-labelledby to be labelled by the primary action button if no label was provided by the
  // user.
  if (
    menuButtonShorthand &&
    primaryActionButtonShorthand &&
    !menuButtonShorthand['aria-label'] &&
    !menuButtonShorthand['aria-labelledby']
  ) {
    menuButtonShorthand['aria-labelledby'] = primaryActionButtonShorthand.id;
  }

  return {
    // Props passed at the top-level
    disabled,
    disabledFocusable,
    iconPosition,
    components: { root: 'div', menuButton: MenuButton, primaryActionButton: Button },
    root: slot.always(getIntrinsicElementProps('div', { ref, ...props }), { elementType: 'div' }),
    menuButton: menuButtonShorthand,
    primaryActionButton: primaryActionButtonShorthand,
  };
};
