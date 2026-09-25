'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { BreadcrumbProps } from './Breadcrumb.types';
import { renderBreadcrumb } from './renderBreadcrumb';
import { useBreadcrumb, useBreadcrumbContextValues } from './useBreadcrumb';
import { useBreadcrumbStyles } from './useBreadcrumbStyles.styles';

export const Breadcrumb: ForwardRefComponent<BreadcrumbProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumb(props, ref);
  const contextValues = useBreadcrumbContextValues(state);

  useBreadcrumbStyles(state);

  return renderBreadcrumb(state, contextValues);
});

Breadcrumb.displayName = 'Breadcrumb';
