/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { DialogProvider, DialogSurfaceProvider } from '../../contexts';
import type { DialogState, DialogContextValues } from './Dialog.types';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog_unstable = (state: DialogState, contextValues: DialogContextValues) => {
  const { content, trigger } = state;

  return (
    <DialogProvider value={contextValues.dialog}>
      <DialogSurfaceProvider value={contextValues.dialogSurface}>
        {trigger}
        {content}
      </DialogSurfaceProvider>
    </DialogProvider>
  );
};
