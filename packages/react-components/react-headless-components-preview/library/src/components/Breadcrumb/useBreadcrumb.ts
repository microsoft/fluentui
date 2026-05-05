'use client';

import type * as React from 'react';
import {
  useBreadcrumbBase_unstable,
  useBreadcrumbContext_unstable,
  useBreadcrumbContextValues_unstable,
} from '@fluentui/react-breadcrumb';

import type { BreadcrumbProps, BreadcrumbState, BreadcrumbContextValues } from './Breadcrumb.types';

/**
 * Returns the state for a Breadcrumb component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderBreadcrumb`.
 */
export const useBreadcrumb = (props: BreadcrumbProps, ref: React.Ref<HTMLElement>): BreadcrumbState => {
  const state: BreadcrumbState = useBreadcrumbBase_unstable(props, ref);

  return state;
};

/**
 * Returns the context values provided by the nearest Breadcrumb, enabling child components to
 * read breadcrumb-level state such as the current size.
 */
export const useBreadcrumbContext = useBreadcrumbContext_unstable;

/**
 * Maps Breadcrumb state to the context values passed down to child components.
 */
export const useBreadcrumbContextValues = useBreadcrumbContextValues_unstable as (
  state: BreadcrumbState,
) => BreadcrumbContextValues;
