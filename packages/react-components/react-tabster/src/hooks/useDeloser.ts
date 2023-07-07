import { useTabsterAttributes } from './useTabsterAttributes';
import { getDeloser, Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

export const useDeloser = (): TabsterTypes.TabsterDOMAttribute => {
  const tabster = useTabster();
  // Initializes the deloser API
  if (tabster) {
    getDeloser(tabster);
  }
  return useTabsterAttributes({
    deloser: {},
  });
};
