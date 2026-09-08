/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { DialogSurfaceContext } from '../dialogContext';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';

/**
 * Render the final JSX of DialogSurface.
 * Returns null when the dialog is closed and unmountOnClose is true.
 * Provides DialogSurfaceContext=true so DialogTrigger inside defaults to action="close".
 *
 * DialogSurface is always rendered inline. For `modal`/`alert`, `<dialog showModal()>`
 * enters the browser top layer. For `non-modal`, the surface uses the native
 * popover API (`popover="manual"` + `showPopover()`), which promotes it to the
 * top layer without enabling native light-dismiss.
 */
export const renderDialogSurface = (state: DialogSurfaceState): JSXElement | null => {
  if (!state.shouldRender) {
    return null;
  }

  assertSlots<DialogSurfaceSlots>(state);

  const content = (
    <DialogSurfaceContext.Provider value={true}>
      <state.root />
    </DialogSurfaceContext.Provider>
  );

  return content;
};
