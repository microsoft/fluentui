import * as React from 'react';
import { Escape } from '@fluentui/keyboard-keys';
import type { DialogModalType } from '../components/Dialog/Dialog.types';
import { DialogSurfaceElement } from '../DialogSurface';

/**
 * Checks if keydown event is a proper Escape key dismiss
 */
export function isEscapeKeyDismiss(
  event: React.KeyboardEvent<DialogSurfaceElement>,
  modalType: DialogModalType,
): boolean {
  return event.key === Escape && modalType !== 'alert' && !event.isDefaultPrevented();
}
