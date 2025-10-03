'use client';

import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { useDrawerBody_unstable } from '@fluentui/react-drawer';

import { useNavContext_unstable } from '../NavContext';
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
  const { tabbable } = useNavContext_unstable();
  const focusAttributes = useArrowNavigationGroup({
    axis: 'vertical',
    circular: true,
    tabbable,
  });

  return useDrawerBody_unstable({ ...focusAttributes, ...props }, ref);
};
