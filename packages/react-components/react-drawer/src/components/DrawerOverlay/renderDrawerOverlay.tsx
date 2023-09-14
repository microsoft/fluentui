/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { Dialog } from '@fluentui/react-dialog';

import type { DrawerOverlayState, DrawerOverlaySlots } from './DrawerOverlay.types';

/**
 * Render the final JSX of DrawerOverlay
 */
export const renderDrawerOverlay_unstable = (state: DrawerOverlayState) => {
  if (!state.motion.canRender) {
    return null;
  }

  assertSlots<DrawerOverlaySlots>(state);

  return (
    <Dialog {...state.dialog}>
      <state.root />
    </Dialog>
  );
};
