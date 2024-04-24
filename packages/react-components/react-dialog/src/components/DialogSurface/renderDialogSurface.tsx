/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { DialogSurfaceState, DialogSurfaceSlots, DialogSurfaceContextValues } from './DialogSurface.types';
import { DialogSurfaceProvider } from '../../contexts';
import { Portal } from '@fluentui/react-portal';
import { useDialogSurfacePortalStyles_unstable } from './useDialogSurfaceStyles.styles';

/**
 * Render the final JSX of DialogSurface
 */
export const renderDialogSurface_unstable = (state: DialogSurfaceState, contextValues: DialogSurfaceContextValues) => {
  assertSlots<DialogSurfaceSlots>(state);

  return (
    <Portal mountNode={state.mountNode}>
      <DialogSurfacePortalPositioning>
        {state.backdrop && <state.backdrop />}
        <DialogSurfaceProvider value={contextValues.dialogSurface}>
          <state.root />
        </DialogSurfaceProvider>
      </DialogSurfacePortalPositioning>
    </Portal>
  );
};

/**
 * Renders nested fixed + relative containers to account and offset the existence of a scrollbar using pure CSS
 * to prevent animation jutter when the Dialog surface is mounting and unmounting
 */
const DialogSurfacePortalPositioning: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const portalStyles = useDialogSurfacePortalStyles_unstable();

  return (
    <div className={portalStyles.outerPositioningContainer}>
      <div className={portalStyles.innerPositioningContainer}>{children}</div>
    </div>
  );
};
