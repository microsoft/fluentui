/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { DashboardGridContextProvider } from '../../contexts/DashboardGridContext';
import { DashboardGridProviderContextProvider } from '../../contexts/DashboardGridProviderContext';
import { DashboardGridHostPortals } from '../../provider/DashboardGridHostPortals';
import { DashboardGridItem } from '../DashboardGridItem/DashboardGridItem';
import type { DashboardGridSlots } from './DashboardGrid.types';
import type { DashboardGridInternalState } from './useDashboardGrid';

const renderSurfaceChildren = (state: DashboardGridInternalState) => {
  if (state.root.children) {
    return state.root.children;
  }

  if (state.modelItemContents) {
    return state.store.getSnapshot().items.map((item, index) => (
      <DashboardGridItem key={item.id} id={item.id}>
        {state.modelItemContents?.[index]}
      </DashboardGridItem>
    ));
  }

  return null;
};

export const renderDashboardGrid_unstable = (state: DashboardGridInternalState): JSXElement => {
  assertSlots<DashboardGridSlots>(state);

  const grid = (
    <DashboardGridContextProvider value={state.contextValue}>
      <state.root>
        <state.surface>
          {renderSurfaceChildren(state)}
          {state.placeholder && <state.placeholder />}
          {state.emptyContent && <state.emptyContent />}
        </state.surface>
      </state.root>
    </DashboardGridContextProvider>
  );

  if (!state.localProvider) {
    return grid;
  }

  return (
    <DashboardGridProviderContextProvider value={state.providerContextValue}>
      {grid}
      <DashboardGridHostPortals registry={state.registry} />
    </DashboardGridProviderContextProvider>
  );
};
