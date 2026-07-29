'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavSubItem } from './useNavSubItem';
import { renderNavSubItem } from './renderNavSubItem';
import type { NavSubItemProps } from './NavSubItem.types';

/**
 * NavSubItem component - a sub-item within a navigation structure.
 */
export const NavSubItem: ForwardRefComponent<NavSubItemProps> = React.forwardRef((props, ref) => {
  const state = useNavSubItem(props, ref);
  return renderNavSubItem(state);
});

NavSubItem.displayName = 'NavSubItem';
