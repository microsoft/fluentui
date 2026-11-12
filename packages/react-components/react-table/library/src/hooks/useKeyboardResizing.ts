'use client';

import type { ColumnResizeState } from './types';
import { useFocusFinders, useTabsterAttributes } from '@fluentui/react-tabster';
import type { KeyboardResizing } from './useKeyboardResizingBase';
import { useKeyboardResizingBase } from './useKeyboardResizingBase';

export function useKeyboardResizing(columnResizeState: ColumnResizeState): KeyboardResizing {
  const { findPrevFocusable } = useFocusFinders();

  // This makes sure the left and right arrow keys are ignored in tabster,
  // so that they can be used for resizing.
  const tabsterAttrs = useTabsterAttributes({
    focusable: {
      ignoreKeydown: {
        ArrowLeft: true,
        ArrowRight: true,
      },
    },
  });

  return useKeyboardResizingBase(columnResizeState, findPrevFocusable, tabsterAttrs);
}
