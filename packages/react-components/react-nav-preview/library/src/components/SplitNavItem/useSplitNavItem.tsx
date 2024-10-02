import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { SplitNavItemProps, SplitNavItemState } from './SplitNavItem.types';
import { useNavContext_unstable } from '../NavContext';
import { Button, MenuButton, ToggleButton } from '@fluentui/react-button';
import { MoreHorizontalFilled, Pin20Regular } from '@fluentui/react-icons';
import { NavItem, NavItemProps } from '../NavItem/index';
import { NavSubItem } from '../NavSubItem/NavSubItem';

/**
 * Create the state required to render SplitNavItem.
 *
 * The returned state can be modified with hooks such as useSplitNavItemStyles_unstable,
 * before being passed to renderSplitNavItem_unstable.
 *
 * @param props - props from this instance of SplitNavItem
 * @param ref - reference to root HTMLDivElement of SplitNavItem
 */
export const useSplitNavItem_unstable = (
  props: SplitNavItemProps,
  ref: React.Ref<HTMLDivElement>,
): SplitNavItemState => {
  const { navItem, actionButton, toggleButton, menuButton, children } = props;

  const { size = 'medium' } = useNavContext_unstable();

  const mainNavItemType = (navItem as NavItemProps).icon ? 'navItem' : 'navSubItem';

  const navItemShorthand = slot.optional(navItem, {
    defaultProps: {
      children,
    },
    elementType: mainNavItemType === 'navItem' ? NavItem : NavSubItem,
  });

  const actionButtonShorthand = slot.optional(actionButton, {
    defaultProps: {
      icon: <Pin20Regular />,
      size: 'small',
      appearance: 'transparent',
    },
    elementType: Button,
  });

  const toggleButtonShorthand = slot.optional(toggleButton, {
    defaultProps: {
      icon: <Pin20Regular />,
      size: 'small',
      appearance: 'transparent',
    },
    elementType: ToggleButton,
  });

  const menuButtonShorthand = slot.optional(menuButton, {
    defaultProps: {
      icon: <MoreHorizontalFilled />,
      size: 'small',
      appearance: 'transparent',
    },
    elementType: MenuButton,
  });

  return {
    components: {
      root: 'div',
      navItem: mainNavItemType === 'navItem' ? NavItem : NavSubItem,
      actionButton: Button,
      toggleButton: ToggleButton,
      menuButton: MenuButton,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
        // because we're passing in children to the NavItem,
        // We can be explicit about the children prop here
        children: null,
      }),
      { elementType: 'div' },
    ),
    navItem: navItemShorthand,
    actionButton: actionButtonShorthand,
    toggleButton: toggleButtonShorthand,
    menuButton: menuButtonShorthand,
    size,
  };
};
