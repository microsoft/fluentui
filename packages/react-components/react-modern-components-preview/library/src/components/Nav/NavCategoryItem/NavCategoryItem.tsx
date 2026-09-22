'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavCategoryItemProps } from './NavCategoryItem.types';
import { renderNavCategoryItem } from './renderNavCategoryItem';
import { useNavCategoryItem, useNavCategoryItemContextValues } from './useNavCategoryItem';
import { useNavCategoryItemStyles } from './useNavCategoryItemStyles.styles';

export const NavCategoryItem: ForwardRefComponent<NavCategoryItemProps> = React.forwardRef((props, ref) => {
  const state = useNavCategoryItem(props, ref);
  const contextValues = useNavCategoryItemContextValues(state);

  useNavCategoryItemStyles(state);

  return renderNavCategoryItem(state, contextValues);
});

NavCategoryItem.displayName = 'NavCategoryItem';
