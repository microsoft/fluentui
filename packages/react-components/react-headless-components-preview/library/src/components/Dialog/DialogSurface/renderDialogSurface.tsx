/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Portal } from '@fluentui/react-portal';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { DialogSurfaceContext } from '../dialogContext';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';

/**
 * Render the final JSX of DialogSurface.
 * Returns null when the dialog is closed and unmountOnClose is true.
 * Provides DialogSurfaceContext=true so DialogTrigger inside defaults to action="close".
 *
 * Non-modal dialogs are rendered via a React portal into `document.body`.
 * Unlike `showModal()`, `dialog.show()` does not enter the browser top layer, so the
 * element is still subject to ancestor `overflow`, `clip-path`, and `transform`
 * stacking constraints. Portalling to body moves it outside any such container.
 * React context (including DialogContext) is preserved across portals.
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

  return state.modalType === 'non-modal' ? <Portal>{content}</Portal> : content;
};
