'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { ChevronDown20Regular } from '@fluentui/react-icons/headless/svg/chevron-down';
import {
  renderNavCategoryItem,
  useNavCategoryItem,
  useNavCategoryItemContextValues,
  useNavContext,
} from '@fluentui/react-headless-components-preview/nav';

import type { NavCategoryItemProps, NavCategoryItemState } from './NavCategoryItem.types';
import { useNavCategoryItemStyles } from './useNavCategoryItemStyles';

/**
 * A NavCategoryItem is the row that expands and collapses a NavCategory. Windmod
 * NavCategoryItem: the headless nav category item decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules), plus the default chevron the headless surface leaves out.
 */
export const NavCategoryItem: ForwardRefComponent<NavCategoryItemProps> = React.forwardRef((props, ref) => {
  // The headless context type makes density optional, and a row outside a Nav has no context
  // at all; the default is Griffel's own, spelled per-component as Griffel spells it.
  const { density = 'medium' } = useNavContext();

  // The expandIcon slot has no renderByDefault, so an unsupplied prop resolves to no slot at
  // all and the glyph restoration has nothing to fill. Materialising it keeps the three inputs
  // distinct: undefined restores the chevron, null removes the slot, and any supplied shorthand
  // is honoured as written.
  const headless = useNavCategoryItem(
    { ...props, expandIcon: props.expandIcon === undefined ? {} : props.expandIcon },
    ref as React.Ref<HTMLButtonElement>,
  );

  const state: NavCategoryItemState = {
    ...headless,
    density,
    expandIcon: headless.expandIcon && {
      'aria-hidden': true,
      ...headless.expandIcon,
      children: headless.expandIcon.children ?? <ChevronDown20Regular />,
    },
  };

  const styled = useNavCategoryItemStyles(state);

  return renderNavCategoryItem(styled, useNavCategoryItemContextValues(styled));
});

NavCategoryItem.displayName = 'NavCategoryItem';
