'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useButtonBase_unstable } from '../Button/index';
import type { MenuButtonBaseProps, MenuButtonBaseState } from './MenuButton.types';

/**
 * Given user props, returns the final state for a MenuButton.
 */
export const useMenuButtonBase_unstable = (
  { menuIcon, ...props }: MenuButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): MenuButtonBaseState => {
  'use no memo';

  const buttonState = useButtonBase_unstable(props, ref);
  // force aria-expanded to be a boolean, not a string
  buttonState.root['aria-expanded'] = props['aria-expanded']
    ? props['aria-expanded'] === 'true' || props['aria-expanded'] === true
    : false;

  return {
    // Button state
    ...buttonState,

    // State calculated from a set of props
    iconOnly: Boolean(!props.children),

    // Slots definition
    components: {
      root: 'button',
      icon: 'span',
      menuIcon: 'span',
    },

    menuIcon: slot.optional(menuIcon, {
      elementType: 'span',
      renderByDefault: true,
    }),
  };
};
