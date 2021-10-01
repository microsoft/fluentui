import * as React from 'react';
import { ChevronDown20Regular, ChevronDown24Regular } from '@fluentui/react-icons';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useButton } from '../Button/index';
import type { MenuButtonProps, MenuButtonState } from './MenuButton.types';

/**
 * Given user props, returns the final state for a MenuButton.
 */
export const useMenuButton = (
  { menuIcon, ...props }: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): MenuButtonState => {
  const buttonState = useButton(props, ref);
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

    menuIcon: resolveShorthand(menuIcon, {
      defaultProps: {
        children: buttonState.size === 'large' ? <ChevronDown24Regular /> : <ChevronDown20Regular />,
      },
      required: true,
    }),
  };
};
