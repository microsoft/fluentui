import * as React from 'react';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { slot } from '@fluentui/react-utilities';
import { useButton_unstable } from '../Button/index';
import type { MenuButtonProps, MenuButtonState } from './MenuButton.types';

/**
 * Given user props, returns the final state for a MenuButton.
 */
export const useMenuButton_unstable = (
  { menuIcon, ...props }: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): MenuButtonState => {
  'use no memo';

  const buttonState = useButton_unstable(props, ref);
  buttonState.root['aria-expanded'] = props['aria-expanded'] ?? false;

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
      defaultProps: {
        children: <ChevronDownRegular />,
      },
      renderByDefault: true,
      elementType: 'span',
    }),
  };
};
