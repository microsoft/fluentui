'use client';

import * as React from 'react';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { slot } from '@fluentui/react-utilities';
import { useButtonContext } from '../../contexts/ButtonContext';
import { useButtonBase_unstable } from '../Button/index';
import type { MenuButtonBaseProps, MenuButtonBaseState, MenuButtonProps, MenuButtonState } from './MenuButton.types';

/**
 * Base hook for MenuButton.
 *
 * The `menuIcon` slot ships no icon of its own and only renders when a consumer
 * provides one, so headless consumers can supply their own visuals. The styled
 * `useMenuButton_unstable` adds the default chevron on top of this.
 *
 * @param props - User provided props to the MenuButton component.
 * @param ref - User provided ref to be passed to the MenuButton component.
 */
export const useMenuButtonBase_unstable = (
  props: MenuButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): MenuButtonBaseState => {
  const { menuIcon, ...buttonProps } = props;
  const buttonState = useButtonBase_unstable(buttonProps, ref);

  return {
    ...buttonState,
    iconOnly: Boolean(!props.children),

    // Slots definition
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...buttonState.components,
      menuIcon: 'span',
    },

    root: {
      ...buttonState.root,
      // force aria-expanded to be a boolean, not a string
      'aria-expanded': props['aria-expanded']
        ? props['aria-expanded'] === 'true' || props['aria-expanded'] === true
        : false,
    },

    menuIcon: slot.optional(menuIcon, {
      elementType: 'span',
    }),
  };
};

/**
 * Given user props, returns the final state for a MenuButton by adding the
 * `appearance`/`size`/`shape` styling props on top of the base state.
 *
 * @param props - User provided props to the MenuButton component.
 * @param ref - User provided ref to be passed to the MenuButton component.
 */
export const useMenuButton_unstable = (
  props: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): MenuButtonState => {
  const { size: contextSize } = useButtonContext();
  const { appearance = 'secondary', menuIcon, shape = 'rounded', size = contextSize ?? 'medium', ...baseProps } = props;
  const baseState = useMenuButtonBase_unstable(baseProps, ref);

  return {
    ...baseState,
    menuIcon: slot.optional(menuIcon, {
      defaultProps: {
        children: <ChevronDownRegular />,
      },
      renderByDefault: true,
      elementType: 'span',
    }),
    appearance,
    shape,
    size,
  };
};
