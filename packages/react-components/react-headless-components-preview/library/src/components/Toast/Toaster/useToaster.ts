'use client';

import * as React from 'react';
import { useToaster as useToasterState } from '@fluentui/react-toast';
import type { ToastPosition } from '@fluentui/react-toast';
import type { ToasterProps, ToasterState } from './Toaster.types';

export const useToaster = ({ toasterId }: ToasterProps, _ref: React.Ref<HTMLElement>): ToasterState => {
  const { toastsToRender, isToastVisible, tryRestoreFocus } = useToasterState({ toasterId });

  const getStackTransform = React.useCallback((position: ToastPosition, stackIndex: number): string => {
    if (stackIndex === 0) {
      return 'translateY(0)';
    }

    const direction = position.startsWith('bottom') ? '-' : '';
    // 100% uses each toast's own height. This keeps spacing consistent even when
    // content varies slightly across toasts.
    return `translateY(calc(${direction}${stackIndex} * (100% + 8px)))`;
  }, []);

  return {
    toastsToRender,
    isToastVisible,
    tryRestoreFocus,
    getStackTransform,
  };
};
