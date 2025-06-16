import * as React from 'react';
import { useDrawerHeader_unstable } from '@fluentui/react-drawer';

import type { NavDrawerHeaderProps, NavDrawerHeaderState } from './NavDrawerHeader.types';

/**
 * Create the state required to render NavDrawerHeader.
 *
 * The returned state can be modified with hooks such as useNavDrawerHeaderStyles_unstable,
 * before being passed to renderNavDrawerHeader_unstable.
 *
 * @param props - props from this instance of NavDrawerHeader
 * @param ref - reference to root HTMLDivElement of NavDrawerHeader
 */
export const useNavDrawerHeader_unstable = (
  props: NavDrawerHeaderProps,
  ref: React.Ref<HTMLElement>,
): NavDrawerHeaderState => {
  return useDrawerHeader_unstable(props, ref);
};
