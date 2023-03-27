import type { BreadcrumbContextValue, BreadcrumbState } from './Breadcrumb.types';

export function useBreadcrumbContextValue(state: BreadcrumbState): BreadcrumbContextValues {
  const { size, dividerType } = state

  const breadcrumb = React.useMemo(() => ({ size, dividerType }, [size, dividerType])
  
  return { breadcrumb }
}
