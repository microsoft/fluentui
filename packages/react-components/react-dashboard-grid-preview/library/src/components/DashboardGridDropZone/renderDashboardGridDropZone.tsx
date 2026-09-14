/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DashboardGridDropZoneSlots } from './DashboardGridDropZone.types';
import type { DashboardGridDropZoneInternalState } from './useDashboardGridDropZone';

export const renderDashboardGridDropZone_unstable = (state: DashboardGridDropZoneInternalState): JSXElement => {
  assertSlots<DashboardGridDropZoneSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.indicator && <state.indicator />}
    </state.root>
  );
};
