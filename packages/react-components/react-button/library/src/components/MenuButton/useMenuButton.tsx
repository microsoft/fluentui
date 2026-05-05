'use client';

import * as React from 'react';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { slot } from '@fluentui/react-utilities';
import { useButton_unstable } from '../Button/index';
import type { MenuButtonProps, MenuButtonState } from './MenuButton.types';

/**
 * Given user props, returns the final state for a MenuButton.
 */
export const useMenuButton_unstable = (
  props: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): MenuButtonState => {
  const { menuIcon, ...buttonProps } = props;
  const buttonState = useButton_unstable(buttonProps, ref);

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
      defaultProps: {
        children: <ChevronDownRegular />,
      },
      renderByDefault: true,
      elementType: 'span',
    }),
  };
};
