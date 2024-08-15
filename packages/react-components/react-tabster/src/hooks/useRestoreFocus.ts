import { getRestorer, getTabsterAttribute, Types as TabsterTypes, RestorerTypes } from 'tabster';
import { useTabster } from './useTabster';

/**
 * Focus will be restored to the most recent target element when it is lost from a source
 * @returns Attribute to apply to the target element where focus is restored
 */
export function useRestoreFocusTarget(): TabsterTypes.TabsterDOMAttribute {
  const tabster = useTabster();
  // Initializes the restorer API
  if (tabster) {
    getRestorer(tabster);
  }

  return getTabsterAttribute({ restorer: { type: RestorerTypes.Target } });
}

/**
 * Focus will be restored to the most recent target element when it is lost from a source
 * @returns Attribute to apply to the element that might lose focus
 */
export function useRestoreFocusSource(): TabsterTypes.TabsterDOMAttribute {
  const tabster = useTabster();
  // Initializes the restorer API
  if (tabster) {
    getRestorer(tabster);
  }

  return getTabsterAttribute({ restorer: { type: RestorerTypes.Source } });
}
