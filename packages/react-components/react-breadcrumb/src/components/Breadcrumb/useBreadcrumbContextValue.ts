import * as React from 'react';
import type { BreadcrumbContextValues, BreadcrumbState } from './Breadcrumb.types';

export function useBreadcrumbContextValues_unstable(state: BreadcrumbState): BreadcrumbContextValues {
  const { size } = state;
  return React.useMemo(() => ({ size }), [size]);
}
