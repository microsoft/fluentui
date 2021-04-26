import { getTabsterAttribute, Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

/**
 * Hook that returns tabster attributes while ensuring tabster exists
 * @param args - same arguments as `getTabsterAttribute`
 */
export const useTabsterAttributes = (
  props: TabsterTypes.TabsterAttributeProps | null,
  plain?: boolean,
): TabsterTypes.TabsterDOMAttribute => {
  // A tabster instance is not necessary to generate tabster attributes
  // but calling the hook will ensure that a tabster instance exists internally and avoids consumers doing the same
  useTabster();

  // When https://github.com/microsoft/tabster/pull/23 is released cleanup these types
  return getTabsterAttribute(props, (plain as unknown) as false);
};
