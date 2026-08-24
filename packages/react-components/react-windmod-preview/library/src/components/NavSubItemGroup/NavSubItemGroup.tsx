'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNavSubItemGroup, useNavSubItemGroup } from '@fluentui/react-headless-components-preview/nav';

import type { NavSubItemGroupProps } from './NavSubItemGroup.types';
import { useNavSubItemGroupStyles } from './useNavSubItemGroupStyles';

/**
 * A NavSubItemGroup holds the sub items of a NavCategory. Windmod NavSubItemGroup: the headless
 * nav sub item group decorated with the Fluent visual contract (Tailwind v4 + CSS Modules). A
 * closed category renders no group at all.
 */
export const NavSubItemGroup: ForwardRefComponent<NavSubItemGroupProps> = React.forwardRef((props, ref) => {
  const state = useNavSubItemGroup(props, ref as React.Ref<HTMLDivElement>);

  return renderNavSubItemGroup(useNavSubItemGroupStyles(state));
});

NavSubItemGroup.displayName = 'NavSubItemGroup';
