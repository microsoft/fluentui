/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { DrawerContextValue, DrawerProvider } from '../../contexts/drawerContext';

import { OverlayDrawerMotion } from '../../shared/drawerMotions';
import type { OverlayDrawerState, OverlayDrawerInternalSlots } from './OverlayDrawer.types';

/**
 * Render the final JSX of OverlayDrawer
 */
export const renderOverlayDrawer_unstable = (state: OverlayDrawerState, contextValue: DrawerContextValue) => {
  assertSlots<OverlayDrawerInternalSlots>(state);
  const { open, size, position } = state;

  return (
    <DrawerProvider value={contextValue}>
      <state.dialog>
        <OverlayDrawerMotion position={position} size={size} visible={open} unmountOnExit>
          <state.root />
        </OverlayDrawerMotion>
      </state.dialog>
    </DrawerProvider>
  );
};
