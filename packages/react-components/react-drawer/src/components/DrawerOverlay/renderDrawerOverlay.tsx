/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';

import type { DrawerOverlayState, DrawerOverlaySlots } from './DrawerOverlay.types';

/**
 * Render the final JSX of DrawerOverlay
 */
export const renderDrawerOverlay_unstable = (state: DrawerOverlayState) => {
  if (!state.dialog || !state.motion.canRender) {
    return null;
  }

  assertSlots<DrawerOverlaySlots>(state);

  return (
    <state.dialog>
      <state.root />
    </state.dialog>
  );
};
