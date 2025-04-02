import { useId } from '@fluentui/react-utilities';
import { useTabsterAttributes } from './useTabsterAttributes';
import { getModalizer, getRestorer, Types as TabsterTypes, RestorerTypes } from 'tabster';
import { useTabster } from './useTabster';

const DangerousNeverHiddenAttribute = 'data-tabster-never-hide';
const DangerousNeverHiddenPropObject = { [DangerousNeverHiddenAttribute]: '' };

export interface UseModalAttributesOptions {
  /**
   * Traps focus inside the elements the attributes are applied.
   * it forbids users to tab out of the focus trap into the actual browser.
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
   * Always reachabled in Tab order
   */
  alwaysFocusable?: boolean;

  /**
   * Id to use for the modalizer. An id will be generated if not provided.
   */
  id?: string;
}

/**
 * !!DANGEROUS!! Designates an element that will not be hidden even when outside an open modal.
 * Only works for top-level elements; should be used with extreme care.
 * @returns Attribute to apply to the target element that should never receive aria-hidden
 */
export function useDangerousNeverHidden_unstable(): { [key: string]: string } {
  return DangerousNeverHiddenPropObject;
}

const tabsterAccessibleCheck: TabsterTypes.ModalizerElementAccessibleCheck = element => {
  return element.hasAttribute(DangerousNeverHiddenAttribute);
};

function initTabsterModules(tabster: TabsterTypes.TabsterCore) {
  getModalizer(tabster, undefined, tabsterAccessibleCheck);
  getRestorer(tabster);
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

  // Initializes the modalizer and restorer APIs
  useTabster(initTabsterModules);

  const id = useId('modal-', options.id);
  const modalAttributes = useTabsterAttributes({
    restorer: { type: RestorerTypes.Source },
    ...(trapFocus && {
      modalizer: {
        id,
        isOthersAccessible: !trapFocus,
        isAlwaysAccessible: alwaysFocusable,
        isTrapped: legacyTrapFocus && trapFocus,
      },
    }),
  });

  const triggerAttributes = useTabsterAttributes({
    restorer: { type: RestorerTypes.Target },
  });

  return { modalAttributes, triggerAttributes };
};
