'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { BreadcrumbDividerProps } from './BreadcrumbDivider.types';
import { useBreadcrumbDivider } from './useBreadcrumbDivider';
import { renderBreadcrumbDivider } from './renderBreadcrumbDivider';

/**
 * A visual separator between breadcrumb items.
 */
export const BreadcrumbDivider: ForwardRefComponent<BreadcrumbDividerProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbDivider(props, ref);

  return renderBreadcrumbDivider(state);
});

BreadcrumbDivider.displayName = 'BreadcrumbDivider';
