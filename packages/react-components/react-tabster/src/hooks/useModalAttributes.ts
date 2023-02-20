import { useId } from '@fluentui/react-utilities';
import { useTabsterAttributes } from './useTabsterAttributes';
import { getDeloser, getModalizer, Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

export interface UseModalAttributesOptions {
  /**
   * Traps focus inside the elements the attributes are applied.
   * Prefer this to `legacyTrapFocus`
   * it forbids users to tab out of the focus trap into the actual browser.
   */
  trapFocus?: boolean;

  /**
   * Traps focus inside the elements the attributes are applied.
   * This prop enables legacy behavior to match previous versions of Fluent and is not
   * recommended for general use.
   * Enabling `legacyTrapFocus` prevents users from tabbing out of the focus trap and into
   * the actual browser. Prefer using `trapFocus` instead of this prop.
   */
  legacyTrapFocus?: boolean;

  /**
   * Always reachabled in Tab order
   */
  alwaysFocusable?: boolean;

  /**
   * Id to use for the modalizer. An id will be generated if not provided.
   */
  id?: string;
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
  const { trapFocus, alwaysFocusable, legacyTrapFocus } = options;
  const tabster = useTabster();
  // Initializes the modalizer and deloser APIs
  if (tabster) {
    getModalizer(tabster);
    getDeloser(tabster);
  }

  const id = useId('modal-', options.id);
  const modalAttributes = useTabsterAttributes({
    deloser: {},
    modalizer: {
      id,
      isOthersAccessible: !trapFocus,
      isAlwaysAccessible: alwaysFocusable,
      isTrapped: legacyTrapFocus,
    },
  });

  const triggerAttributes = useTabsterAttributes({
    deloser: {},
  });

  return { modalAttributes, triggerAttributes };
};
