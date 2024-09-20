import * as React from 'react';
// import { MoreHorizontalFilled } from '@fluentui/react-icons';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { SplitNavItemProps, SplitNavItemState } from './SplitNavItem.types';
import { NavItem } from '../NavItem/NavItem';
import { useNavContext_unstable } from '../NavContext';
import { Button, MenuButton } from '@fluentui/react-button';
import { MoreHorizontalFilled, Pin20Regular } from '@fluentui/react-icons';

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
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): SplitNavItemState => {
  const { primaryNavItem, children, icon, value, secondaryActionButton, menuButton } = props;

  const { size = 'medium', selectedValue } = useNavContext_unstable();
  const selected = selectedValue === value;

  const primaryActionButtonShorthand = slot.optional(primaryNavItem, {
    defaultProps: {
      children,
      icon,
      value,
    },
    renderByDefault: true,
    elementType: NavItem,
  });

  const secondaryActionButtonShorthand = slot.optional(secondaryActionButton, {
    defaultProps: {
      icon: <Pin20Regular />,
      appearance: 'transparent',
    },
    renderByDefault: true,
    elementType: Button,
  });

  const menuButtonShorthand = slot.optional(menuButton, {
    defaultProps: {
      icon: <MoreHorizontalFilled />,
      appearance: 'transparent',
    },
    // renderByDefault: true,

    renderByDefault: true,
    elementType: MenuButton,
  });

  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
      primaryNavItem: NavItem,
      secondaryActionButton: Button,
      menuButton: MenuButton,
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    primaryNavItem: primaryActionButtonShorthand,
    secondaryActionButton: secondaryActionButtonShorthand,
    menuButton: menuButtonShorthand,
    value,
    size,
    selected,
  };
};
