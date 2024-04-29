import { useTabster } from './useTabster';
import { getObservedElement, Types as TabsterTypes } from 'tabster';
import { useTabsterAttributes } from './useTabsterAttributes';

export function useObservedElement(name: string | string[]): TabsterTypes.TabsterDOMAttribute {
  const tabster = useTabster();
  if (tabster) {
    getObservedElement(tabster);
  }

  return useTabsterAttributes({ observed: { names: Array.isArray(name) ? name : [name] } });
}
