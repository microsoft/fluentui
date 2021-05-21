import { useId } from '@fluentui/react-utilities';
import { useTabsterAttributes } from './useTabsterAttributes';
import { getDeloser, getModalizer, Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

export interface UseModalFocusOptions {
  /**
   * Traps focus inside the elements the attributes are applied
   * @default true
   */
  trapFocus?: boolean;

  /**
   * Always reachabled in Tab order
   */
  alwaysFocusable?: boolean;
}

/**
 * Returns DOM attributes to apply to an element (a) trigger(s)
 * The element will behave like a modal dialog by trapping focus by default and hiding other content
 * If the element disappears from the DOM, the trigger element will be focused
 *
 * @returns
 */
export const useModalFocus = (
  options: UseModalFocusOptions = {},
): { modalAttributes: TabsterTypes.TabsterDOMAttribute; triggerAttributes: TabsterTypes.TabsterDOMAttribute } => {
  const { trapFocus = true, alwaysFocusable } = options;
  const tabster = useTabster();
  // Initializes the modalizer and deloser APIs
  if (tabster) {
    getModalizer(tabster);
    getDeloser(tabster);
  }

  const id = useId('modal-');
  const modalAttributes = useTabsterAttributes({
    deloser: {},
    modalizer: { id, isOthersAccessible: !trapFocus, isAlwaysAccessible: alwaysFocusable },
  });

  const triggerAttributes = useTabsterAttributes({
    deloser: {},
  });

  return { modalAttributes, triggerAttributes };
};
