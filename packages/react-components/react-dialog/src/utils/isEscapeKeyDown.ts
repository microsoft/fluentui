import * as React from 'react';
import { Escape } from '@fluentui/keyboard-keys';
import { DialogModalType } from '../components/Dialog/Dialog.types';
import { normalizeDefaultPrevented } from './normalizeDefaultPrevented';

/**
 * Checks if keydown event is a proper Escape key dismiss
 */
export function isEscapeKeyDismiss(event: React.KeyboardEvent | KeyboardEvent, type: DialogModalType): boolean {
  const isDefaultPrevented = normalizeDefaultPrevented(event);
  return event.key === Escape && type !== 'alert' && !isDefaultPrevented();
}
