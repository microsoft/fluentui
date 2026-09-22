'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavCategoryProps } from './NavCategory.types';
import { renderNavCategory } from './renderNavCategory';
import { useNavCategory, useNavCategoryContextValues } from './useNavCategory';

export const NavCategory: ForwardRefComponent<NavCategoryProps> = React.forwardRef((props, ref) => {
  const state = useNavCategory(props, ref);
  const contextValues = useNavCategoryContextValues(state);

  return renderNavCategory(state, contextValues);
});

NavCategory.displayName = 'NavCategory';
