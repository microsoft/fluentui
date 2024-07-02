/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import * as React from 'react';

import { DialogProvider, DialogSurfaceProvider } from '../../contexts';
import type { DialogState, DialogContextValues, DialogSlots } from './Dialog.types';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog_unstable = (state: DialogState, contextValues: DialogContextValues) => {
  assertSlots<DialogSlots>(state);

  return (
    <DialogProvider value={contextValues.dialog}>
      <DialogSurfaceProvider value={contextValues.dialogSurface}>
        {state.trigger}
        {state.content && <state.surfaceMotion>{state.content as React.ReactElement}</state.surfaceMotion>}
      </DialogSurfaceProvider>
    </DialogProvider>
  );
};
