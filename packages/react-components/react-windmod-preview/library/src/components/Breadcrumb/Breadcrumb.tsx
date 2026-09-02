'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderBreadcrumb,
  useBreadcrumb,
  useBreadcrumbContextValues,
} from '@fluentui/react-headless-components-preview/breadcrumb';

import type { BreadcrumbProps } from './Breadcrumb.types';
import { useBreadcrumbStyles } from './useBreadcrumbStyles';

/**
 * A Breadcrumb shows where a page sits in a navigation hierarchy. Windmod Breadcrumb: the
 * headless breadcrumb decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Breadcrumb: ForwardRefComponent<BreadcrumbProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-breadcrumb's styled useBreadcrumb.
  ({ size = 'medium', ...rest }, ref) => {
    // The headless state omits `size`, so the context values must be built from the state that
    // carries it — otherwise the children read `undefined` instead of the breadcrumb's size.
    const state = useBreadcrumb(rest, ref);
    const styled = useBreadcrumbStyles({ ...state, size });

    const contextValues = useBreadcrumbContextValues(styled);

    return renderBreadcrumb(styled, contextValues);
  },
);

Breadcrumb.displayName = 'Breadcrumb';
