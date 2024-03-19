import * as React from 'react';
import { useInlineDrawer_unstable } from '@fluentui/react-drawer';
import { useNav_unstable } from '../Nav/useNav';
import type { NavDrawerProps, NavDrawerState } from './NavDrawer.types';

/**
 * Create the state required to render NavDrawer.
 *
 * The returned state can be modified with hooks such as useNavDrawerStyles_unstable,
 * before being passed to renderNavDrawer_unstable.
 *
 * @param props - props from this instance of NavDrawer
 * @param ref - reference to root HTMLDivElement of NavDrawer
 */
export const useNavDrawer_unstable = (props: NavDrawerProps, ref: React.Ref<HTMLDivElement>): NavDrawerState => {
  const inlineDrawerState = useInlineDrawer_unstable(props, ref);
  const navState = useNav_unstable(props, ref);

  return {
    ...inlineDrawerState,
    ...navState,
  };
};
