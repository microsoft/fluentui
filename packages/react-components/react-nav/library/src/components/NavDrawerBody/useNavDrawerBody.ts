import * as React from 'react';
import { useDrawerBody_unstable } from '@fluentui/react-drawer';

import type { NavDrawerBodyProps, NavDrawerBodyState } from './NavDrawerBody.types';
/**
 * Create the state required to render NavDrawerBody.
 *
 * The returned state can be modified with hooks such as useNavDrawerBodyStyles_unstable,
 * before being passed to renderNavDrawerBody_unstable.
 *
 * @param props - props from this instance of NavDrawerBody
 * @param ref - reference to root HTMLDivElement of NavDrawerBody
 */
export const useNavDrawerBody_unstable = (
  props: NavDrawerBodyProps,
  ref: React.Ref<HTMLDivElement>,
): NavDrawerBodyState => {
  return useDrawerBody_unstable(props, ref);
};
