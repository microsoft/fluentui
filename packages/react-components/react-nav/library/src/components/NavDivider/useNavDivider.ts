import * as React from 'react';
import type { NavDividerProps, NavDividerState } from './NavDivider.types';
import { useDivider_unstable } from '@fluentui/react-divider';

/**
 * Create the state required to render NavDivider.
 *
 * The returned state can be modified with hooks such as useNavDividerStyles_unstable,
 * before being passed to renderNavDivider_unstable.
 *
 * @param props - props from this instance of NavDivider
 * @param ref - reference to root HTMLDivElement of NavDivider
 */
export const useNavDivider_unstable = (props: NavDividerProps, ref: React.Ref<HTMLElement>): NavDividerState => {
  return useDivider_unstable({ appearance: 'strong', ...props }, ref);
};
