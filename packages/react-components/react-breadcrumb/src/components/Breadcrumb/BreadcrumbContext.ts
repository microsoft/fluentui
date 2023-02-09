import * as React from 'react';
import { BreadcrumbContextValue } from './Breadcrumb.types';

const breadcrumb = React.createContext<BreadcrumbContextValue | undefined>(undefined);

/**
 * @internal
 */
export const breadcrumbDefaultValue: BreadcrumbContextValue = {
  size: 'medium',
};

/**
 * @internal
 */
export const BreadcrumbProvider = breadcrumb.Provider;

/**
 * @internal
 */
export const useBreadcrumb_unstable = () => React.useContext(breadcrumb) ?? breadcrumbDefaultValue;
