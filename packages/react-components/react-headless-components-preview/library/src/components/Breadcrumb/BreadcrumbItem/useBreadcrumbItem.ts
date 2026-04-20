'use client';

import type * as React from 'react';
import { useBreadcrumbItemBase_unstable } from '@fluentui/react-breadcrumb';

import type { BreadcrumbItemProps, BreadcrumbItemState } from './BreadcrumbItem.types';

/**
 * Returns the state for a BreadcrumbItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderBreadcrumbItem`.
 */
export const useBreadcrumbItem = (props: BreadcrumbItemProps, ref: React.Ref<HTMLLIElement>): BreadcrumbItemState => {
  const state: BreadcrumbItemState = useBreadcrumbItemBase_unstable(props, ref);

  return state;
};
