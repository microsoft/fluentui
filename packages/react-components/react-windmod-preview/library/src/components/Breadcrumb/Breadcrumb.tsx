'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderBreadcrumb,
  useBreadcrumb,
  useBreadcrumbContextValues,
} from '@fluentui/react-headless-components-preview/breadcrumb';

import type { BreadcrumbProps, BreadcrumbState } from './Breadcrumb.types';
import { useBreadcrumbStyles } from './useBreadcrumbStyles';

/**
 * A Breadcrumb shows where a page sits in a navigation hierarchy. Windmod Breadcrumb: the
 * headless breadcrumb decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Breadcrumb: ForwardRefComponent<BreadcrumbProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-breadcrumb's styled useBreadcrumb.
  const { size = 'medium', ...rest } = props;

  // The headless state omits `size`, so the context values must be built from the state that
  // carries it — otherwise the children read `undefined` instead of the breadcrumb's size.
  const state: BreadcrumbState = {
    ...useBreadcrumb(rest, ref),
    size,
  };
  const styled = useBreadcrumbStyles(state);

  return renderBreadcrumb(styled, useBreadcrumbContextValues(styled));
});

Breadcrumb.displayName = 'Breadcrumb';
