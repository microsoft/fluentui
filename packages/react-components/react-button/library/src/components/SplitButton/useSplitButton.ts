'use client';

import type * as React from 'react';
import { useId, slot } from '@fluentui/react-utilities';
import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import type {
  SplitButtonBaseProps,
  SplitButtonBaseState,
  SplitButtonProps,
  SplitButtonState,
} from './SplitButton.types';

/**
 * Given user props, defines default props for the SplitButton and returns processed state.
 * @param props - User provided props to the SplitButton component.
 * @param ref - User provided ref to be passed to the SplitButton component.
 */
export const useSplitButton_unstable = (props: SplitButtonProps, ref: React.Ref<HTMLDivElement>): SplitButtonState => {
  const { appearance = 'secondary', icon, menuIcon, shape = 'rounded', size = 'medium', ...rest } = props;
  const baseState = useSplitButtonBase_unstable(rest, ref);

  const menuButtonShorthand = slot.optional(props.menuButton, {
    defaultProps: {
      ...baseState.menuButton,
      appearance,
      disabledFocusable: baseState.disabledFocusable,
      menuIcon,
      shape,
      size,
    },
    renderByDefault: true,
    elementType: MenuButton,
  });
  const primaryActionButtonShorthand = slot.optional(props.primaryActionButton, {
    defaultProps: {
      ...baseState.primaryActionButton,
      appearance,
      disabledFocusable: baseState.disabledFocusable,
      icon,
      iconPosition: baseState.iconPosition,
      shape,
      size,
    },
    renderByDefault: true,
    elementType: Button,
  });

  return {
    ...baseState,
    // Props passed at the top-level
    appearance,
    shape,
    size,
    // Slots definition
    components: { root: 'div', menuButton: MenuButton, primaryActionButton: Button },
    menuButton: menuButtonShorthand,
    primaryActionButton: primaryActionButtonShorthand,
  };
};

/**
 * Base hook for SplitButton component, which manages design-agnostic state related to slots
 * structure and ARIA attributes, without design-specific props such as `appearance`, `shape`, or
 * `size`.
 *
 * Concrete wrappers recreate child slots from these base prop defaults before rendering.
 *
 * @param props - User provided props to the SplitButton component.
 * @param ref - User provided ref to be passed to the SplitButton component.
 */
export const useSplitButtonBase_unstable = (
  props: SplitButtonBaseProps,
  ref: React.Ref<HTMLDivElement>,
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
    ...rest
  } = props;
  const baseId = useId('splitButton-');

  const menuButtonShorthand = slot.optional(menuButton, {
    defaultProps: {
      disabled,
    },
    renderByDefault: true,
    elementType: 'button',
  });

  const primaryActionButtonShorthand = slot.optional(primaryActionButton, {
    defaultProps: {
      children,
      disabled,
      id: baseId + '__primaryActionButton',
    },
    renderByDefault: true,
    elementType: 'button',
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
    disabled,
    disabledFocusable,
    iconPosition,
    // Slots definition
    components: { root: 'div', menuButton: 'button', primaryActionButton: 'button' },
    root: slot.always({ ref, ...rest }, { elementType: 'div' }),
    menuButton: menuButtonShorthand,
    primaryActionButton: primaryActionButtonShorthand,
  };
};
