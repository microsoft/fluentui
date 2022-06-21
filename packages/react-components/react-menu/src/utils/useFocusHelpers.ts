import { useFocusFinders } from '@fluentui/react-tabster';
import * as React from 'react';

export function useFocusHelpers() {
  const { findFirstFocusable, findNextFocusable, findPrevFocusable } = useFocusFinders();
  const focusFirst = React.useCallback(
    (el: HTMLElement) => {
      const firstFocusable = el && findNextFocusable(el);
      firstFocusable?.focus();
    },
    [findFirstFocusable],
  );
  const focusAfter = React.useCallback(
    (el: HTMLElement) => {
      const nextFocusable = el && findNextFocusable(el);
      nextFocusable?.focus();
    },
    [findNextFocusable],
  );

  const focusBefore = React.useCallback(
    (el: HTMLElement) => {
      const prevFocusable = el && findPrevFocusable(el);
      prevFocusable?.focus();
    },
    [findPrevFocusable],
  );

  return {
    focusBefore,
    focusAfter,
    focusFirst,
  };
}
