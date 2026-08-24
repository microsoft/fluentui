'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderNavCategory,
  useNavCategory,
  useNavCategoryContextValues,
} from '@fluentui/react-headless-components-preview/nav';

import type { NavCategoryProps } from './NavCategory.types';

/**
 * A NavCategory groups a NavCategoryItem with the NavSubItemGroup it expands. It renders no
 * element of its own — only the category context its children read — so it has no visual
 * contract to apply and no classes to carry.
 */
export const NavCategory: ForwardRefComponent<NavCategoryProps> = React.forwardRef((props, ref) => {
  const state = useNavCategory(props, ref as React.Ref<HTMLDivElement>);

  return renderNavCategory(state, useNavCategoryContextValues(state));
});

NavCategory.displayName = 'NavCategory';
