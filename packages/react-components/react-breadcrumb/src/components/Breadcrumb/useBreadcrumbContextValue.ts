import * as React from 'react';
import type { BreadcrumbContextValues, BreadcrumbState } from './Breadcrumb.types';

export function useBreadcrumbContextValues_unstable(state: BreadcrumbState): BreadcrumbContextValues {
  const { size, dividerType } = state;

  const breadcrumb = React.useMemo(() => {
    return { size, dividerType };
  }, [size, dividerType]);

  return { breadcrumb };
}
