/** @jsxRuntime classic */
/** @jsx createElementNext */

import { createElementNext } from '@fluentui/react-jsx-runtime';

import type { DialogSurfaceState, DialogSurfaceContextValues } from './DialogSurface.types';
import { DialogSurfaceProvider } from '../../contexts';
import { Portal } from '@fluentui/react-portal';

/**
 * Render the final JSX of DialogSurface
 */
export const renderDialogSurface_unstable = (state: DialogSurfaceState, contextValues: DialogSurfaceContextValues) => (
  <Portal>
    {state.backdrop && <state.backdrop />}
    <DialogSurfaceProvider value={contextValues.dialogSurface}>
      <state.root />
    </DialogSurfaceProvider>
  </Portal>
);
