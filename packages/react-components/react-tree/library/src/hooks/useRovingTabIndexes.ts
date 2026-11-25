'use client';

import { useFocusedElementChange } from '@fluentui/react-tabster';
import type { HTMLElementWalker } from '../utils/createHTMLElementWalker';
import { useRovingTabIndexBase } from './useRovingTabIndexBase';

/**
 * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 *
 * @internal
 */
export function useRovingTabIndex(): {
  rove: (nextElement: HTMLElement, focusOptions?: FocusOptions) => void;
  initialize: (walker: HTMLElementWalker) => void;
  forceUpdate: () => void;
} {
  return useRovingTabIndexBase(useFocusedElementChange);
}
