import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';

/**
 * Dialog modal type
 * @public
 */
export const DialogModalType = {
  modal: 'modal',
  nonModal: 'non-modal',
  alert: 'alert',
} as const;

export type DialogModalType = ValuesOf<typeof DialogModalType>;
