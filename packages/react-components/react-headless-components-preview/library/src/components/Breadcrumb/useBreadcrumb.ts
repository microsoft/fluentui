'use client';

import type * as React from 'react';
import { useBreadcrumbBase_unstable, useBreadcrumbContextValues_unstable } from '@fluentui/react-breadcrumb';

import type { BreadcrumbProps, BreadcrumbState, BreadcrumbContextValues } from './Breadcrumb.types';
import { useArrowNavigationGroup } from '../../hooks/focusgroup';

/**
 * Returns the state for a Breadcrumb component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderBreadcrumb`.
 */
export const useBreadcrumb = (props: BreadcrumbProps, ref: React.Ref<HTMLElement>): BreadcrumbState => {
  const state: BreadcrumbState = useBreadcrumbBase_unstable(props, ref);
  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'horizontal',
    circular: true,
    memorizeCurrent: true,
  });

  if (props.focusMode === 'arrow' && state.root.focusgroup === undefined) {
    Object.assign(state.root, arrowNavigationAttributes);
  }

  return state;
};

/**
 * Returns the context values provided by the nearest Breadcrumb, enabling child components to
 * read breadcrumb-level state such as the current size.
 */
export { useBreadcrumbContext_unstable as useBreadcrumbContext } from '@fluentui/react-breadcrumb';

/**
 * Maps Breadcrumb state to the context values passed down to child components.
 */
export const useBreadcrumbContextValues = useBreadcrumbContextValues_unstable as (
  state: BreadcrumbState,
) => BreadcrumbContextValues;
