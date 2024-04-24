/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { DialogSurfaceState, DialogSurfaceSlots, DialogSurfaceContextValues } from './DialogSurface.types';
import { DialogSurfaceProvider } from '../../contexts';
import { Portal } from '@fluentui/react-portal';

/**
 * Render the final JSX of DialogSurface
 */
export const renderDialogSurface_unstable = (state: DialogSurfaceState, contextValues: DialogSurfaceContextValues) => {
  assertSlots<DialogSurfaceSlots>(state);

  return (
    <Portal mountNode={state.mountNode}>
      <div className={state.dialogSurfacePortalClassName?.outerPositioningContainerClassName}>
        <div className={state.dialogSurfacePortalClassName?.innerPositioningContainerClassName}>
          {state.backdrop && <state.backdrop />}
          <DialogSurfaceProvider value={contextValues.dialogSurface}>
            <state.root />
          </DialogSurfaceProvider>
        </div>
      </div>
    </Portal>
  );
};
