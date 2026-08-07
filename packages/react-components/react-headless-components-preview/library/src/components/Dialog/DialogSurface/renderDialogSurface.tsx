/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { DialogSurfaceContext } from '../dialogContext';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';
import { OverlaySurfaceHost } from '../../../overlayRuntime';

type DialogSurfaceStateInternal = DialogSurfaceState & {
  fallbackBehavior?: React.ReactElement;
  onFallbackBackdropClick: React.MouseEventHandler<HTMLDivElement>;
};

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
  const { fallbackBehavior, onFallbackBackdropClick } =
    state as unknown as DialogSurfaceStateInternal;

  const content = (
    <DialogSurfaceContext.Provider value={true}>
      <state.root />
    </DialogSurfaceContext.Provider>
  );
  const fallbackContent =
    state.modalType === 'non-modal' ? (
      content
    ) : (
      <div
        data-overlay-fallback-backdrop=""
        data-open={state.open ? '' : undefined}
        hidden={!state.open}
        onClick={onFallbackBackdropClick}
        style={{ position: 'fixed', zIndex: 1000000, inset: 0 }}
      >
        {content}
      </div>
    );

  return (
    <>
      <OverlaySurfaceHost
        active={state.open}
        fallbackChildren={fallbackContent}
        keepMountedWhenInactive={!state.unmountOnClose}
      >
        {content}
      </OverlaySurfaceHost>
      {fallbackBehavior}
    </>
  );
};
