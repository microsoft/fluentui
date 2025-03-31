import { getObservedElement, Types as TabsterTypes } from 'tabster';

import { useTabster } from './useTabster';
import { useTabsterAttributes } from './useTabsterAttributes';

export function useObservedElement(name: string | string[]): TabsterTypes.TabsterDOMAttribute {
  useTabster(getObservedElement);

  return useTabsterAttributes({ observed: { names: Array.isArray(name) ? name : [name] } });
}
