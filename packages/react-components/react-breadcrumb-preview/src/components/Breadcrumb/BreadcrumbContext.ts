import * as React from 'react';
import { BreadcrumbContextValues } from './Breadcrumb.types';

const BreadcrumbContext = React.createContext<BreadcrumbContextValues | undefined>(undefined);

/**
 * @internal
 */
export const breadcrumbDefaultValue: BreadcrumbContextValues = {
  size: 'medium',
  items: new Set(),
  registerItem: () => ({}),
  removeItem: () => ({}),
  hasInteractiveItems: false,
};

/**
 * @internal
 */
export const BreadcrumbProvider = BreadcrumbContext.Provider;

/**
 * @internal
 */
export const useBreadcrumbContext_unstable = () => React.useContext(BreadcrumbContext) ?? breadcrumbDefaultValue;
