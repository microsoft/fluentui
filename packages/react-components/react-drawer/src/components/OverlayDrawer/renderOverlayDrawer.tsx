/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';

import type { OverlayDrawerState, OverlayDrawerInternalSlots } from './OverlayDrawer.types';

/**
 * Render the final JSX of OverlayDrawer
 */
export const renderOverlayDrawer_unstable = (state: OverlayDrawerState) => {
  if (!state.motion.canRender) {
    return null;
  }

  assertSlots<OverlayDrawerInternalSlots>(state);

  return (
    <state.dialog>
      <state.root />
    </state.dialog>
  );
};
