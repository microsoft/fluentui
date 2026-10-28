'use client';

import * as React from 'react';
import { FOCUS_TRAP_ATTRIBUTE, useFocusManager } from './focusManager';

export interface UseModalAttributesOptions {
  /**
   * Traps focus inside the element the attributes are applied to.
   *
   * Native modal surfaces (`<dialog>` opened with `showModal()`) already make the rest of the page inert;
   * combine with `legacyTrapFocus` to also keep Tab from leaving the surface for the browser UI.
   */
  trapFocus?: boolean;

  /**
   * Keeps Tab / Shift+Tab cycling inside the trapped element instead of letting focus move to the browser UI,
   * matching the default focus trap of Fluent UI v9.
   */
  legacyTrapFocus?: boolean;
}

export type ModalAttributes = {
  [FOCUS_TRAP_ATTRIBUTE]?: '';
};

/**
 * Returns the DOM attributes that trap keyboard focus inside a modal surface.
 *
 * `triggerAttributes` is kept for API parity with `@fluentui/react-tabster`: native dialogs and popovers
 * restore focus to the previously focused element on close, so the trigger needs no attributes.
 *
 * @param options - Options to configure the focus trap
 */
export const useModalAttributes = (
  options: UseModalAttributesOptions = {},
): { modalAttributes: ModalAttributes; triggerAttributes: Record<string, never> } => {
  const { trapFocus = false, legacyTrapFocus = false } = options;
  const cycleFocus = trapFocus && legacyTrapFocus;
  useFocusManager();

  return React.useMemo(
    () => ({
      modalAttributes: cycleFocus ? { [FOCUS_TRAP_ATTRIBUTE]: '' as const } : {},
      triggerAttributes: {},
    }),
    [cycleFocus],
  );
};
