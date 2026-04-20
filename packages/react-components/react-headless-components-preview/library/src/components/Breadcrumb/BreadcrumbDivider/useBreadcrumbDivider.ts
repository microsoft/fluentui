'use client';

import type * as React from 'react';
import { useBreadcrumbDividerBase_unstable } from '@fluentui/react-breadcrumb';

import type { BreadcrumbDividerProps, BreadcrumbDividerState } from './BreadcrumbDivider.types';

/**
 * Returns the state for a BreadcrumbDivider component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderBreadcrumbDivider`.
 */
export const useBreadcrumbDivider = (
  props: BreadcrumbDividerProps,
  ref: React.Ref<HTMLLIElement>,
): BreadcrumbDividerState => {
  const state: BreadcrumbDividerState = useBreadcrumbDividerBase_unstable(props, ref);

  return state;
};
