import * as React from 'react';
import { Escape } from '@fluentui/keyboard-keys';
import type { DialogModalType } from '../components/Dialog/Dialog.types';

/**
 * Checks if keydown event is a proper Escape key dismiss
 */
export function isEscapeKeyDismiss(event: React.KeyboardEvent, type: DialogModalType): boolean {
  return event.key === Escape && type !== 'alert' && !event.isDefaultPrevented();
}
