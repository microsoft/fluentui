/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Portal } from '@fluentui/react-portal';
import { assertSlots } from '@fluentui/react-utilities';

import { DialogSurfaceProvider } from '../../contexts';
import { DialogBackdropMotion } from '../DialogBackdropMotion';
import type { DialogSurfaceState, DialogSurfaceSlots, DialogSurfaceContextValues } from './DialogSurface.types';

/**
 * Render the final JSX of DialogSurface
 */
export const renderDialogSurface_unstable = (state: DialogSurfaceState, contextValues: DialogSurfaceContextValues) => {
  assertSlots<DialogSurfaceSlots>(state);

  return (
    <Portal mountNode={state.mountNode}>
      {state.backdrop && (
        <DialogBackdropMotion appear visible={state.open}>
          <state.backdrop />
        </DialogBackdropMotion>
      )}
      <DialogSurfaceProvider value={contextValues.dialogSurface}>
        <state.root />
      </DialogSurfaceProvider>
    </Portal>
  );
};
