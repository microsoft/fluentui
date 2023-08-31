/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { DrawerOverlayState, DrawerOverlaySlots } from './DrawerOverlay.types';
import { Dialog } from '@fluentui/react-dialog';

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
