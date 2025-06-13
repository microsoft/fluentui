import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { Tooltip } from '@fluentui/react-tooltip';
import type { SplitNavItemProps, SplitNavItemState } from './SplitNavItem.types';
import { useNavContext_unstable } from '../NavContext';
import { Button, MenuButton, ToggleButton } from '@fluentui/react-button';
import { MoreHorizontalFilled, Pin20Regular } from '@fluentui/react-icons';
import { NavItem } from '../NavItem/index';
import { NavSubItem } from '../NavSubItem/NavSubItem';
import { useNavCategoryContext_unstable } from '../NavCategoryContext';

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
  const {
    navItem,
    actionButton,
    toggleButton,
    menuButton,
    actionButtonTooltip,
    toggleButtonTooltip,
    menuButtonTooltip,
    children,
  } = props;

  const { density = 'medium' } = useNavContext_unstable();

  const { value: potentialParenValue } = useNavCategoryContext_unstable();

  const isSubNav = potentialParenValue.length > 0 ? true : false;

  const navItemShorthand = slot.always(navItem, {
    defaultProps: {
      children,
    },
    elementType: isSubNav ? NavSubItem : NavItem,
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

  const actionButtonTooltipShorthand = slot.optional(actionButtonTooltip, {
    defaultProps: { relationship: 'label' },
    elementType: Tooltip,
  });

  const toggleButtonTooltipShorthand = slot.optional(toggleButtonTooltip, {
    defaultProps: { relationship: 'label' },
    elementType: Tooltip,
  });

  const menuButtonTooltipShorthand = slot.optional(menuButtonTooltip, {
    defaultProps: { relationship: 'label' },
    elementType: Tooltip,
  });

  return {
    components: {
      root: 'div',
      navItem: isSubNav ? NavSubItem : NavItem,
      actionButton: Button,
      toggleButton: ToggleButton,
      menuButton: MenuButton,
      actionButtonTooltip: Tooltip,
      toggleButtonTooltip: Tooltip,
      menuButtonTooltip: Tooltip,
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
    actionButtonTooltip: actionButtonTooltipShorthand,
    toggleButtonTooltip: toggleButtonTooltipShorthand,
    menuButtonTooltip: menuButtonTooltipShorthand,
    density,
    isSubNav,
  };
};
