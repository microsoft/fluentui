'use client';

import * as React from 'react';
import type { ToastContextValues, ToastState } from './Toast.types';
import type { ToastContextValue } from './toastContext';

export const useToastContextValues = (state: ToastState): ToastContextValues => {
  const { open, intent, bodyId, titleId, requestOpenChange } = state;

  const toast = React.useMemo<ToastContextValue>(
    () => ({ open, intent, bodyId, titleId, requestOpenChange }),
    [open, intent, bodyId, titleId, requestOpenChange],
  );

  return { toast };
};
