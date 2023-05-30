import * as React from 'react';
import type { BreadcrumbContextValues, BreadcrumbState } from './Breadcrumb.types';

export function useBreadcrumbContextValues_unstable(state: BreadcrumbState): BreadcrumbContextValues {
  const { appearance, dividerType, focusMode, iconPosition, size } = state;

  const breadcrumb = React.useMemo(() => {
    return { appearance, dividerType, focusMode, iconPosition, size };
  }, [appearance, dividerType, focusMode, iconPosition, size]);

  return { breadcrumb };
}
