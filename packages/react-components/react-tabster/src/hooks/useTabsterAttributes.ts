import { getTabsterAttribute, Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

/**
 * Hook that returns tabster attributes while ensuring tabster exists
 */
export const useTabsterAttributes = (props: TabsterTypes.TabsterAttributeProps): TabsterTypes.TabsterDOMAttribute => {
  // A tabster instance is not necessary to generate tabster attributes
  // but calling the hook will ensure that a tabster instance exists internally and avoids consumers doing the same
  useTabster();

  return getTabsterAttribute(props);
};
