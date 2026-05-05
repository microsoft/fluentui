'use client';

import * as React from 'react';
import type { ToastIntent } from '@fluentui/react-toast';

export type { ToastIntent };

export type ToastOpenChangeData =
  | { type: 'dismissClick'; open: false; event: React.MouseEvent }
  // Auto-dismiss has no DOM event; null satisfies the EventData<string, unknown> constraint.
  | { type: 'timeout'; open: false; event: null }
  | { type: 'triggerClick'; open: boolean; event: React.MouseEvent };

export type ToastContextValue = {
  open: boolean;
  intent: ToastIntent | undefined;
  bodyId: string;
  titleId: string;
  requestOpenChange: (data: ToastOpenChangeData) => void;
};

const defaultToastContextValue: ToastContextValue = {
  open: false,
  intent: undefined,
  bodyId: '',
  titleId: '',
  requestOpenChange() {
    /* noop */
  },
};

export const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const useToastContext = (): ToastContextValue => React.useContext(ToastContext) ?? defaultToastContextValue;
