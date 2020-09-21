import * as React from 'react';
import { SizeValue } from '../../utils';

export type BreadcrumbContextValue = {
  size: SizeValue;
};

export const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  size: 'medium',
});

export const useBreadcrumbContext = () => React.useContext(BreadcrumbContext);
