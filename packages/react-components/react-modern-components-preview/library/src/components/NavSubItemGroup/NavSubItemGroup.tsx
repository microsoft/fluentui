'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavSubItemGroupProps } from './NavSubItemGroup.types';
import { renderNavSubItemGroup } from './renderNavSubItemGroup';
import { useNavSubItemGroup } from './useNavSubItemGroup';
import { useNavSubItemGroupStyles } from './useNavSubItemGroupStyles.styles';

export const NavSubItemGroup: ForwardRefComponent<NavSubItemGroupProps> = React.forwardRef((props, ref) => {
  const state = useNavSubItemGroup(props, ref);

  useNavSubItemGroupStyles(state);

  return renderNavSubItemGroup(state);
});

NavSubItemGroup.displayName = 'NavSubItemGroup';
