import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { DashboardGridProviderContextProvider } from '../../contexts/DashboardGridProviderContext';
import { DashboardGridHostPortals } from '../../provider/DashboardGridHostPortals';
import type { DashboardGridProviderState } from './useDashboardGridProvider';

export const renderDashboardGridProvider_unstable = (state: DashboardGridProviderState): JSXElement => (
  <DashboardGridProviderContextProvider value={state.contextValue}>
    {state.children}
    <DashboardGridHostPortals registry={state.registry} />
  </DashboardGridProviderContextProvider>
);
