'use client';

import { useBreadcrumbContextValues_unstable } from '@fluentui/react-breadcrumb';

import type { BreadcrumbState, BreadcrumbContextValues } from './Breadcrumb.types';

/**
 * Returns the state for a Breadcrumb component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderBreadcrumb`.
 */
export { useBreadcrumbBase_unstable as useBreadcrumb } from '@fluentui/react-breadcrumb';

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
