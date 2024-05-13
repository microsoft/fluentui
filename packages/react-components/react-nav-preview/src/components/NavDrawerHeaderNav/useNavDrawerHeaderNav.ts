import * as React from 'react';
import { useDrawerHeaderNavigation_unstable } from '@fluentui/react-drawer';

import type { NavDrawerHeaderNavProps, NavDrawerHeaderNavState } from './NavDrawerHeaderNav.types';

/**
 * Create the state required to render NavDrawerHeaderNav.
 *
 * The returned state can be modified with hooks such as useNavDrawerHeaderNavStyles_unstable,
 * before being passed to renderNavDrawerHeaderNav_unstable.
 *
 * @param props - props from this instance of NavDrawerHeaderNav
 * @param ref - reference to root HTMLDivElement of NavDrawerHeaderNav
 */
export const useNavDrawerHeaderNav_unstable = (
  props: NavDrawerHeaderNavProps,
  ref: React.Ref<HTMLElement>,
): NavDrawerHeaderNavState => {
  return useDrawerHeaderNavigation_unstable(props, ref);
};
