'use client';

import type * as React from 'react';
import type { NavDividerProps, NavDividerState } from './NavDivider.types';
import { useDivider } from '../../Divider';

/**
 * Create the state required to render NavDivider.
 *
 * Headless version — delegates to the headless Divider with `vertical` fixed to `false`.
 *
 * @param props - props from this instance of NavDivider
 * @param ref - reference to root HTMLDivElement of NavDivider
 */
export const useNavDivider = (props: NavDividerProps, ref: React.Ref<HTMLDivElement>): NavDividerState => {
  return useDivider(
    {
      ...props,
      vertical: false,
    },
    ref,
  );
};
