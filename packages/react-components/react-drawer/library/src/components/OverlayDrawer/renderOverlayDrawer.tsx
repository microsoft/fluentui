/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { DrawerContextValue, DrawerProvider } from '../../contexts/drawerContext';

import type { OverlayDrawerState, OverlayDrawerInternalSlots } from './OverlayDrawer.types';

/**
 * Render the final JSX of OverlayDrawer
 */
export const renderOverlayDrawer_unstable = (state: OverlayDrawerState, contextValue: DrawerContextValue) => {
  if (!state.motion.canRender) {
    return null;
  }

  assertSlots<OverlayDrawerInternalSlots>(state);

  return (
    <DrawerProvider value={contextValue}>
      <state.dialog>
        <state.root />
      </state.dialog>
    </DrawerProvider>
  );
};
