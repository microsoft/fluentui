import * as React from 'react';
import { BreadcrumbSizeValues } from './Breadcrumb';

export type BreadcrumbContextValue = {
  size: BreadcrumbSizeValues;
};

export const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  size: 'medium',
});

export const useBreadcrumbContext = () => React.useContext(BreadcrumbContext);
