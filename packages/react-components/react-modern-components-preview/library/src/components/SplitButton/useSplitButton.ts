'use client';

import type * as React from 'react';
import { useSplitButton as useSplitButtonBase } from '@fluentui/react-headless-components-preview/split-button';
import { slot } from '@fluentui/react-utilities';
import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import type { SplitButtonProps, SplitButtonState } from './SplitButton.types';

export const useSplitButton = (props: SplitButtonProps, ref: React.Ref<HTMLDivElement>): SplitButtonState => {
  const {
    appearance = 'secondary',
    menuButton,
    primaryActionButton,
    shape = 'rounded',
    size = 'medium',
    ...rest
  } = props;
  const baseState = useSplitButtonBase({ ...rest, menuButton, primaryActionButton }, ref);

  const menuButtonState = slot.optional(menuButton, {
    defaultProps: {
      ...baseState.menuButton,
      appearance,
      disabledFocusable: baseState.disabledFocusable,
      menuIcon: props.menuIcon,
      shape,
      size,
    },
    renderByDefault: true,
    elementType: MenuButton,
  });
  const primaryActionButtonState = slot.optional(primaryActionButton, {
    defaultProps: {
      ...baseState.primaryActionButton,
      appearance,
      disabledFocusable: baseState.disabledFocusable,
      icon: props.icon,
      iconPosition: baseState.iconPosition,
      shape,
      size,
    },
    renderByDefault: true,
    elementType: Button,
  });

  return {
    ...baseState,
    components: { root: 'div', menuButton: MenuButton, primaryActionButton: Button },
    root: {
      ...baseState.root,
      'data-appearance': appearance,
      'data-disabled': baseState.disabled ? '' : undefined,
      'data-disabled-focusable': baseState.disabledFocusable ? '' : undefined,
      'data-shape': shape,
      'data-size': size,
    },
    appearance,
    menuButton: menuButtonState,
    primaryActionButton: primaryActionButtonState,
    shape,
    size,
  };
};
