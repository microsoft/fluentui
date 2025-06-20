import * as React from 'react';
import { useDrawerFooter_unstable } from '@fluentui/react-drawer';
import type { NavDrawerFooterProps, NavDrawerFooterState } from './NavDrawerFooter.types';

/**
 * Create the state required to render NavDrawerFooter.
 *
 * The returned state can be modified with hooks such as useNavDrawerFooterStyles_unstable,
 * before being passed to renderNavDrawerFooter_unstable.
 *
 * @param props - props from this instance of NavDrawerFooter
 * @param ref - reference to root HTMLDivElement of NavDrawerFooter
 */
export const useNavDrawerFooter_unstable = (
  props: NavDrawerFooterProps,
  ref: React.Ref<HTMLElement>,
): NavDrawerFooterState => {
  return useDrawerFooter_unstable(props, ref);
};
