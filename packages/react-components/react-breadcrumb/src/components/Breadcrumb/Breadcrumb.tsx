import * as React from 'react';
import { useBreadcrumb_unstable } from './useBreadcrumb';
import { renderBreadcrumb_unstable } from './renderBreadcrumb';
import { useBreadcrumbStyles_unstable } from './useBreadcrumbStyles';
import type { BreadcrumbProps } from './Breadcrumb.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useBreadcrumbContextValues_unstable } from './useBreadcrumbContextValue';

/**
 * Breadcrumb component - TODO: add more docs
 */
export const Breadcrumb: ForwardRefComponent<BreadcrumbProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumb_unstable(props, ref);
  const contextValues = useBreadcrumbContextValues_unstable(state);

  useBreadcrumbStyles_unstable(state);
  return renderBreadcrumb_unstable(state, contextValues);
});

Breadcrumb.displayName = 'Breadcrumb';
