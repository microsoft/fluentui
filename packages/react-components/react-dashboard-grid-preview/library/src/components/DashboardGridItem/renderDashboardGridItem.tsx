/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import * as ReactDOM from 'react-dom';
import { DashboardGridItemContextProvider } from '../../contexts/DashboardGridItemContext';
import type { DashboardGridItemSlots } from './DashboardGridItem.types';
import type { DashboardGridItemInternalState } from './useDashboardGridItem';

export const renderDashboardGridItem_unstable = (state: DashboardGridItemInternalState): JSXElement => {
  assertSlots<DashboardGridItemSlots>(state);
  const ResizeHandle = state.resizeHandle;

  return (
    <DashboardGridItemContextProvider value={state.contextValue}>
      <state.root>
        {state.dragHandle && <state.dragHandle />}
        <state.content />
        {state.subGrid && <state.subGrid />}
        {ResizeHandle && state.resizeDirections.map(edge => <ResizeHandle key={edge} {...state.resizeHandles[edge]} />)}
      </state.root>
      {state.dragPreviewElement ? ReactDOM.createPortal(state.dragPreviewContent, state.dragPreviewElement) : null}
    </DashboardGridItemContextProvider>
  );
};
