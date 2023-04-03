import * as React from 'react';
import { BreadcrumbContextValue } from './Breadcrumb.types';

const BreadcrumbContext = React.createContext<BreadcrumbContextValue | undefined>(undefined);

/**
 * @internal
 */
export const breadcrumbDefaultValue: BreadcrumbContextValue = {
  appearance: 'transparent',
  size: 'medium',
  dividerType: 'chevron',
};

/**
 * @internal
 */
export const BreadcrumbProvider = BreadcrumbContext.Provider;

/**
 * @internal
 */
export const useBreadcrumbContext_unstable = () => React.useContext(BreadcrumbContext) ?? breadcrumbDefaultValue;
