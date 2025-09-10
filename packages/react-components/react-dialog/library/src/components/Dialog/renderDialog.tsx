/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import * as React from 'react';

import { MotionRefForwarder } from '../MotionRefForwarder';
import { DialogProvider, DialogSurfaceProvider } from '../../contexts';
import type { DialogState, DialogContextValues, InternalDialogSlots } from './Dialog.types';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog_unstable = (state: DialogState, contextValues: DialogContextValues): JSXElement => {
  assertSlots<InternalDialogSlots>(state);

  return (
    <DialogProvider value={contextValues.dialog}>
      <DialogSurfaceProvider value={contextValues.dialogSurface}>
        {state.trigger}
        {state.content && (
          <state.surfaceMotion>
            <MotionRefForwarder>
              {/* Casting here as content should be equivalent to <DialogSurface/> */}
              {/* FIXME: content should not be ReactNode it should be ReactElement instead. */}
              {state.content as React.ReactElement}
            </MotionRefForwarder>
          </state.surfaceMotion>
        )}
      </DialogSurfaceProvider>
    </DialogProvider>
  );
};
