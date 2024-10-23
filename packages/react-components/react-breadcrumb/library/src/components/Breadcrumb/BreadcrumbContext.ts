import * as React from 'react';
import { BreadcrumbContextValues } from './Breadcrumb.types';

const BreadcrumbContext = React.createContext<BreadcrumbContextValues | undefined>(undefined);

/**
 * @internal
 */
export const breadcrumbDefaultValue: BreadcrumbContextValues = {
  size: 'medium',
};

/**
 * @internal
 */
export const BreadcrumbProvider = BreadcrumbContext.Provider;

/**
 * @internal
 */
export const useBreadcrumbContext_unstable = () => React.useContext(BreadcrumbContext) ?? breadcrumbDefaultValue;
