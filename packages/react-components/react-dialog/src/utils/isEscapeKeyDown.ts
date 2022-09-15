import * as React from 'react';
import { Escape } from '@fluentui/keyboard-keys';
import type { DialogModalType } from '../components/Dialog/Dialog.types';
import { DialogSurfaceElement } from '../DialogSurface';
import { isHTMLDialogElement } from './isHTMLDialogElement';

/**
 * Checks if keydown event is a proper Escape key dismiss
 */
export function isEscapeKeyDismiss(
  event: React.KeyboardEvent<DialogSurfaceElement>,
  modalType: DialogModalType,
): boolean {
  return (
    event.key === Escape &&
    // `non-modal` should always have Escape key handling
    // `modal` should only be handled in the case of non native dialog
    (modalType === 'non-modal' || (!isHTMLDialogElement(event.currentTarget) && modalType === 'modal')) &&
    !event.isDefaultPrevented()
  );
}
