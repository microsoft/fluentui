'use client';

import { useId } from '@fluentui/react-utilities';
import { type TabsterDOMAttribute } from '../focus-navigation/types';
import { useTabsterAttributes } from './useTabsterAttributes';

export interface UseModalAttributesOptions {
  /**
   * Traps focus inside the elements the attributes are applied.
   * It forbids users to tab out of the focus trap into the actual browser.
   */
  trapFocus?: boolean;

  /**
   * Traps focus inside the elements the attributes are applied.
   * This prop enables traditional force-focus behavior to match previous versions of Fluent.
   * Without this, users can tab out of the focus trap and into the browser chrome.
   * This matches the behavior of the native <dialog> element and inert.
   * We recommend setting this to true based on user feedback and consistency.
   */
  legacyTrapFocus?: boolean;

  /**
   * Always reachable in Tab order
   */
  alwaysFocusable?: boolean;

  /**
   * Id to use for the modalizer. An id will be generated if not provided.
   */
  id?: string;
}

/**
 * Applies modal dialog behaviour through DOM attributes.
 * Modal element will focus trap and hide other content on the page.
 * The trigger element will be focused if focus is lost after the modal element is removed.
 *
 * @returns DOM attributes to apply to the modal element and its trigger
 */
export const useModalAttributes = (
  options: UseModalAttributesOptions = {},
): { modalAttributes: TabsterDOMAttribute; triggerAttributes: TabsterDOMAttribute } => {
  const { trapFocus, alwaysFocusable, legacyTrapFocus } = options;
  const id = useId('modal-', options.id);

  const modalAttributes = useTabsterAttributes({
    restorer: { type: 'source' },
    ...(trapFocus && {
      modalizer: {
        id,
        isOthersAccessible: !trapFocus,
        isAlwaysAccessible: alwaysFocusable,
        isTrapped: !!(legacyTrapFocus && trapFocus),
      },
    }),
  });

  const triggerAttributes = useTabsterAttributes({
    restorer: { type: 'target' },
  });

  return { modalAttributes, triggerAttributes };
};
