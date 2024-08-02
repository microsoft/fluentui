import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { SplitNavItemProps, SplitNavItemState } from './SplitNavItem.types';
import { NavItem } from '../NavItem/NavItem';

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
  const { navItem, children, actionItems } = props;
  const size = 'medium';
  const value = 'someValue';
  const selected = true;

  const navItemShorthand = slot.optional(navItem, {
    defaultProps: {
      children,
    },
    renderByDefault: true,
    elementType: NavItem,
  });

  const actionItemsShorthand = slot.optional(actionItems, { elementType: 'div', renderByDefault: true });

  return {
    components: {
      root: 'div',
      navItem: NavItem,
      actionItems: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    navItem: navItemShorthand,
    actionItems: actionItemsShorthand,
    size,
    value,
    selected,
  };
};
