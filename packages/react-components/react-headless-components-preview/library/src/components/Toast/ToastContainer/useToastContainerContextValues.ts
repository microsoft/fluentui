'use client';

import * as React from 'react';
import type { ToastContainerContextValues, ToastContainerState } from './ToastContainer.types';

export const useToastContainerContextValues = (state: ToastContainerState): ToastContainerContextValues => {
  const { close, intent, titleId, bodyId } = state;

  const toast = React.useMemo(
    () => ({
      close,
      intent,
      titleId,
      bodyId,
    }),
    [close, intent, titleId, bodyId],
  );

  return { toast };
};
