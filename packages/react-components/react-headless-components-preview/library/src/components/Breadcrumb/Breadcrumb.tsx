'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { BreadcrumbProps } from './Breadcrumb.types';
import { useBreadcrumb, useBreadcrumbContextValues } from './useBreadcrumb';
import { renderBreadcrumb } from './renderBreadcrumb';

/**
 * A breadcrumb component for displaying navigation hierarchy.
 */
export const Breadcrumb: ForwardRefComponent<BreadcrumbProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumb(props, ref);
  const contextValues = useBreadcrumbContextValues(state);

  return renderBreadcrumb(state, contextValues);
});

Breadcrumb.displayName = 'Breadcrumb';
