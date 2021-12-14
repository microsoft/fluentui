import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { ChevronDown20Regular, ChevronDown24Regular } from '@fluentui/react-icons';
import { MenuButtonProps, MenuButtonState } from '@fluentui/react-button';
import { useButtonState } from '../Button/useButtonState';

/**
 * Takes props and returns state for eventually rendering a MenuButton.
 * @param props - User provided props to the MenuButton component.
 */
export const useMenuButtonState = ({ menuIcon, ...buttonProps }: MenuButtonProps): MenuButtonState => {
  const buttonState = useButtonState(buttonProps);

  // TODO: We need to document MUTATION ONLY of state.
  //       Creating a new object like this can break other hooks' mutations of state :(
  return {
    ...buttonState,

    // State calculated from a set of props
    iconOnly: Boolean(!buttonProps.children),

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
