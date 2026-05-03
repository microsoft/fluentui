'use client';

import * as React from 'react';
import type { ToastContainerContextValues, ToastContainerState } from './ToastContainer.types';
import type { ToastContextValue } from '../toastContext';

export const useToastContainerContextValues = (state: ToastContainerState): ToastContainerContextValues => {
  const { intent, bodyId, titleId, close } = state;

  const toast = React.useMemo<ToastContextValue>(
    () => ({
      open: true,
      intent,
      bodyId,
      titleId,
      // ToastContext.requestOpenChange is used by child components (e.g. a dismiss button)
      // to close the toast. In the Toaster DX, closing routes through the state machine.
      requestOpenChange: data => {
        if (!data.open) {
          close();
        }
      },
    }),
    [intent, bodyId, titleId, close],
  );

  return { toast };
};
