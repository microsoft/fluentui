'use client';

import type * as React from 'react';
import { useBreadcrumbBase_unstable, useBreadcrumbContextValues_unstable } from '@fluentui/react-breadcrumb';

import type { BreadcrumbProps, BreadcrumbState, BreadcrumbContextValues } from './Breadcrumb.types';

/**
 * Returns the state for a Breadcrumb component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderBreadcrumb`.
 */
export const useBreadcrumb = (props: BreadcrumbProps, ref: React.Ref<HTMLElement>): BreadcrumbState => {
  const state = useBreadcrumbBase_unstable(props, ref);

  // v9 implements focusMode="arrow" with tabster; headless uses the native focusgroup (polyfilled by consumers).
  if (props.focusMode === 'arrow' && state.list) {
    // eslint-disable-next-line react-hooks/immutability
    state.list.focusgroup = 'toolbar inline wrap';
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
