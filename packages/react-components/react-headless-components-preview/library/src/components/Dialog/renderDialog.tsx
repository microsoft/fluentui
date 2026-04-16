/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type { JSXElement } from '@fluentui/react-utilities';
import { DialogContext, DialogSurfaceContext } from './dialogContext';
import type { DialogContextValues, DialogState } from './Dialog.types';

/**
 * Render the final JSX of Dialog.
 * Dialog renders no DOM element itself — it provides context for compound sub-components.
 */
export const renderDialog = (state: DialogState, contextValues: DialogContextValues): JSXElement => {
  return (
    <DialogContext.Provider value={contextValues.dialog}>
      <DialogSurfaceContext.Provider value={contextValues.dialogSurface}>
        {state.trigger}
        {state.content}
      </DialogSurfaceContext.Provider>
    </DialogContext.Provider>
  ) as JSXElement;
};
