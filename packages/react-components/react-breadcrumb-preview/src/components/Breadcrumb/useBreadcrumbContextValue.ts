import * as React from 'react';
import type { BreadcrumbContextValues, BreadcrumbState } from './Breadcrumb.types';

export function useBreadcrumbContextValues_unstable(state: BreadcrumbState): BreadcrumbContextValues {
  const { appearance, dividerType, size } = state;

  const breadcrumb = React.useMemo(() => {
    return { appearance, dividerType, size };
  }, [appearance, dividerType, size]);

  return { breadcrumb };
}
