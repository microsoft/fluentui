'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavSubItemProps } from './NavSubItem.types';
import { renderNavSubItem } from './renderNavSubItem';
import { useNavSubItem } from './useNavSubItem';
import { useNavSubItemStyles } from './useNavSubItemStyles.styles';

export const NavSubItem: ForwardRefComponent<NavSubItemProps> = React.forwardRef((props, ref) => {
  const state = useNavSubItem(props, ref);

  useNavSubItemStyles(state);

  return renderNavSubItem(state);
}) as ForwardRefComponent<NavSubItemProps>;

NavSubItem.displayName = 'NavSubItem';
