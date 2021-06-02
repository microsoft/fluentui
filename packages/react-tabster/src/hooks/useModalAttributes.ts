import { useId } from '@fluentui/react-utilities';
import { useTabsterAttributes } from './useTabsterAttributes';
import { getDeloser, getModalizer, Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

export interface UseModalAttributesOptions {
  /**
   * Traps focus inside the elements the attributes are applied
   */
  trapFocus?: boolean;

  /**
   * Always reachabled in Tab order
   */
  alwaysFocusable?: boolean;
}

/**
 * Applies modal dialog behaviour through DOM attributes
 * Modal element will focus trap and hide other content on the page
 * The trigger element will be focused if focus is lost after the modal element is removed
 *
 * @returns DOM attributes to apply to the modal element and its trigger
 */
export const useModalAttributes = (
  options: UseModalAttributesOptions = {},
): { modalAttributes: TabsterTypes.TabsterDOMAttribute; triggerAttributes: TabsterTypes.TabsterDOMAttribute } => {
  const { trapFocus, alwaysFocusable } = options;
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
