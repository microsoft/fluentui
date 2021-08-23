import * as React from 'react';
import type { SizeValue } from '../../utils';

export type BreadcrumbSizeValues = Exclude<SizeValue, 'larger' | 'largest'>;

export type BreadcrumbContextValue = {
  size: BreadcrumbSizeValues;
};

export const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  size: 'medium',
});

export const useBreadcrumbContext = () => React.useContext(BreadcrumbContext);
