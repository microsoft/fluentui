/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { renderDialogSurface_unstable } from '@fluentui/react-dialog';

import type { DrawerOverlaySurfaceState, DrawerOverlaySurfaceSlots } from './DrawerOverlaySurface.types';

/**
 * Render the final JSX of DrawerOverlaySurface
 */
export const renderDrawerOverlaySurface_unstable = (state: DrawerOverlaySurfaceState) => {
  assertSlots<DrawerOverlaySurfaceSlots>(state);

  return renderDialogSurface_unstable(state, state.dialogSurfaceContextValues);
};
