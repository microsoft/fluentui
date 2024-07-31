/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Portal } from '@fluentui/react-portal';
import { assertSlots } from '@fluentui/react-utilities';

import { DialogSurfaceProvider } from '../../contexts';
import type { DialogSurfaceState, DialogSurfaceSlots, DialogSurfaceContextValues } from './DialogSurface.types';

/**
 * Render the final JSX of DialogSurface
 */
export const renderDialogSurface_unstable = (state: DialogSurfaceState, contextValues: DialogSurfaceContextValues) => {
  assertSlots<DialogSurfaceSlots>(state);

  return (
    <Portal mountNode={state.mountNode}>
      {state.backdrop && (
        <state.backdropMotion>
          <state.backdrop />
        </state.backdropMotion>
      )}
      <DialogSurfaceProvider value={contextValues.dialogSurface}>
        <state.root />
      </DialogSurfaceProvider>
    </Portal>
  );
};
