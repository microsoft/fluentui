'use client';

import type * as React from 'react';
import { useNavItemBase_unstable } from '@fluentui/react-nav';
import { slot } from '@fluentui/react-utilities';
import { toDataAttributeValue } from '../../../utils';
import type { NavItemProps, NavItemState } from './NavItem.types';

export const useNavItem = (
  props: NavItemProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): NavItemState => {
  const state: NavItemState = useNavItemBase_unstable(props, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-disabled': toDataAttributeValue(state.root.disabled || state.root['aria-disabled']),
      'data-selected': toDataAttributeValue(state.selected),
    },
    icon: slot.optional(props.icon, {
      defaultProps: { 'aria-hidden': true },
      elementType: 'span',
    }),
  };
};
