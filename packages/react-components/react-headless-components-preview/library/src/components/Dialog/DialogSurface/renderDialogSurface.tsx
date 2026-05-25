/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { Portal } from '../../Portal';
import { DialogSurfaceContext } from '../dialogContext';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';

/**
 * Render the final JSX of DialogSurface.
 * Returns null when the dialog is closed and unmountOnClose is true.
 * Provides DialogSurfaceContext=true so DialogTrigger inside defaults to action="close".
 *
 * Non-modal dialogs are wrapped in a `Portal` so they escape ancestor stacking
 * constraints (`overflow`, `clip-path`, `transform`). Unlike `showModal()`,
 * `dialog.show()` does not enter the browser top layer. Modal/alert dialogs use
 * `showModal()` and need no portal — they live in the top layer.
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

  if (state.modalType === 'non-modal') {
    return <Portal>{content}</Portal>;
  }

  return content;
};
