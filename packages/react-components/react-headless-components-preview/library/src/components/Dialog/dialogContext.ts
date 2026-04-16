'use client';

import * as React from 'react';

// Core types live here to avoid circular deps with Dialog.types.ts
export type DialogModalType = 'modal' | 'non-modal' | 'alert';

export type DialogOpenChangeData =
  | { type: 'escapeKeyDown'; open: boolean; event: React.KeyboardEvent<HTMLDialogElement> }
  | { type: 'backdropClick'; open: boolean; event: React.MouseEvent<HTMLDialogElement> }
  | { type: 'triggerClick'; open: boolean; event: React.MouseEvent };

export type DialogContextValue = {
  open: boolean;
  modalType: DialogModalType;
  dialogTitleId: string;
  isNestedDialog: boolean;
  inertTrapFocus: boolean;
  unmountOnClose: boolean;
  requestOpenChange: (data: DialogOpenChangeData) => void;
};

export type DialogSurfaceContextValue = boolean;

const defaultDialogContextValue: DialogContextValue = {
  open: false,
  modalType: 'modal',
  dialogTitleId: '',
  isNestedDialog: false,
  inertTrapFocus: false,
  unmountOnClose: true,
  requestOpenChange() {
    /* noop */
  },
};

export const DialogContext = React.createContext<DialogContextValue | undefined>(undefined);

export const DialogSurfaceContext = React.createContext<DialogSurfaceContextValue>(false);

export const useDialogContext = (): DialogContextValue => React.useContext(DialogContext) ?? defaultDialogContextValue;

export const useDialogSurfaceContext = (): DialogSurfaceContextValue => React.useContext(DialogSurfaceContext);
