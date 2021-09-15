import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { MenuButtonProps, MenuButtonSlots, MenuButtonState } from './MenuButton.types';
import { useButton } from '../Button/index';
import { ChevronDown20Regular, ChevronDown24Regular } from '@fluentui/react-icons';

/**
 * Const listing which props are shorthand props.
 */
export const menuButtonSlots: (keyof MenuButtonSlots)[] = ['icon', 'menuIcon', 'root'];

/**
 * Given user props, returns the final state for a MenuButton.
 */
export const useMenuButton = (
  { menuIcon, ...props }: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): MenuButtonState => {
  const buttonState = useButton(props, ref);
  const state: MenuButtonState = {
    ...buttonState,
    components: {
      root: 'button',
      icon: 'span',
      menuIcon: 'span',
    },
    menuIcon: resolveShorthand(menuIcon, {
      defaultProps: {
        children: buttonState.size === 'large' ? <ChevronDown24Regular /> : <ChevronDown20Regular />,
      },
    }),
  };
  return state;
};
