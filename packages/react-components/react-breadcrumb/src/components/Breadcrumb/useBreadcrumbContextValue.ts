import * as React from 'react';
import type { BreadcrumbContextValues, BreadcrumbState } from './Breadcrumb.types';

export function useBreadcrumbContextValues_unstable(state: BreadcrumbState): BreadcrumbContextValues {
  const { size, dividerType, appearance } = state;

  const breadcrumb = React.useMemo(() => {
    return { size, dividerType, appearance };
  }, [size, dividerType, appearance]);

  return { breadcrumb };
}
