'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavSubItemGroup } from './useNavSubItemGroup';
import { renderNavSubItemGroup } from './renderNavSubItemGroup';
import type { NavSubItemGroupProps } from './NavSubItemGroup.types';

/**
 * NavSubItemGroup component - a group of sub-items within a navigation structure.
 */
export const NavSubItemGroup: ForwardRefComponent<NavSubItemGroupProps> = React.forwardRef((props, ref) => {
  const state = useNavSubItemGroup(props, ref);
  return renderNavSubItemGroup(state);
});

NavSubItemGroup.displayName = 'NavSubItemGroup';
