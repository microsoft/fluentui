/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DashboardGridDragSourceSlots } from './DashboardGridDragSource.types';
import type { DashboardGridDragSourceInternalState } from './useDashboardGridDragSource';

export const renderDashboardGridDragSource_unstable = (
  state: DashboardGridDragSourceInternalState,
): JSXElement => {
  assertSlots<DashboardGridDragSourceSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.preview && <state.preview />}
    </state.root>
  );
};
