import type { ValuesOf } from '../utils/typings.js';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { Dialog } from './dialog.js';

/**
 * Dialog modal type
 * @public
 */
export const DialogType = {
  modal: 'modal',
  nonModal: 'non-modal',
  alert: 'alert',
} as const;

export type DialogType = ValuesOf<typeof DialogType>;

/**
 * Predicate function that determines if the element should be considered a dialog.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is a dialog.
 * @public
 */
export function isDialog(element?: Node | null, tagName: string = '-dialog'): element is Dialog {
  if (element?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (element as Element).tagName.toLowerCase().endsWith(tagName);
}

/**
 * The tag name for the dialog element.
 *
 * @public
 */
export const tagName = `${FluentDesignSystem.prefix}-dialog` as const;
