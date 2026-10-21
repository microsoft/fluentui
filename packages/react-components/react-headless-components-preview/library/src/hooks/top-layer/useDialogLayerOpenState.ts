'use client';

import type * as React from 'react';
import type { TopLayerMode, UseLayerOpenStateOptions, UseLayerOpenStateReturn } from './types';
import { dialogAdapter } from './dialogAdapter';
import { useLayerOpenStateWith } from './useLayerOpenState';

/**
 * `useLayerOpenState` for layers that can open as a modal `<dialog>`: also accepts `mode="modal"`, and handles a
 * `<dialog>` element without the Popover API. Use it only where the layer can be a dialog, so other components don't
 * bundle the dialog code.
 */
export const useDialogLayerOpenState = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseLayerOpenStateOptions<TopLayerMode>,
): UseLayerOpenStateReturn => useLayerOpenStateWith(ref, options, dialogAdapter);
