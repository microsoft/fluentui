/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';

import { DialogProvider, DialogSurfaceProvider } from '../../contexts';
import { DialogSurfaceMotion } from '../DialogSurfaceMotion';
import type { DialogState, DialogContextValues } from './Dialog.types';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog_unstable = (state: DialogState, contextValues: DialogContextValues) => {
  const { content, open, trigger } = state;

  return (
    <DialogProvider value={contextValues.dialog}>
      <DialogSurfaceProvider value={contextValues.dialogSurface}>
        {trigger}
        {content && (
          <DialogSurfaceMotion appear visible={open} unmountOnExit>
            {/* Casting here as content should be equivalent to <DialogSurface/> */}
            {/* FIXME: content should not be ReactNode it should be ReactElement instead. */}
            {content as React.ReactElement}
          </DialogSurfaceMotion>
        )}
      </DialogSurfaceProvider>
    </DialogProvider>
  );
};
