'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useSplitButtonBase_unstable } from '@fluentui/react-button';
import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import type { SplitButtonProps, SplitButtonState } from './SplitButton.types';

/**
 * Returns the state for a SplitButton component, given its props and ref.
 *
 * Composes base behavior with headless Button and MenuButton slots without adding
 * SplitButton-level styling or state attributes.
 */
export const useSplitButton = (props: SplitButtonProps, ref: React.Ref<HTMLDivElement>): SplitButtonState => {
  const {
    children,
    disabled,
    disabledFocusable,
    icon,
    iconPosition,
    menuButton,
    menuIcon,
    primaryActionButton,
    ...rootProps
  } = props;
  const baseState = useSplitButtonBase_unstable(
    {
      children,
      disabled,
      disabledFocusable,
      icon,
      iconPosition,
      menuButton,
      menuIcon,
      primaryActionButton,
    },
    ref,
  );
  Object.assign(baseState.root, rootProps);

  const menuButtonShorthand = slot.optional(props.menuButton, {
    defaultProps: {
      ...baseState.menuButton,
      children: undefined,
      disabledFocusable: baseState.disabledFocusable,
      menuIcon: props.menuIcon,
    },
    renderByDefault: true,
    elementType: MenuButton,
  });
  const primaryActionButtonShorthand = slot.optional(props.primaryActionButton, {
    defaultProps: {
      ...baseState.primaryActionButton,
      children: props.children,
      disabledFocusable: baseState.disabledFocusable,
      icon: props.icon,
      iconPosition: baseState.iconPosition,
    },
    renderByDefault: true,
    elementType: Button,
  });

  return {
    ...baseState,
    components: { root: 'div', menuButton: MenuButton, primaryActionButton: Button },
    menuButton: menuButtonShorthand,
    primaryActionButton: primaryActionButtonShorthand,
  };
};
