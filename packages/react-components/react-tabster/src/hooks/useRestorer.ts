import { getRestorer, getTabsterAttribute, Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

export function useRestorer(type: 'source' | 'target'): TabsterTypes.TabsterDOMAttribute {
  const tabster = useTabster();
  // Initializes the restorer API
  if (tabster) {
    getRestorer(tabster);
  }

  const restorerType: TabsterTypes.RestorerType =
    type === 'source' ? TabsterTypes.RestorerTypes.Source : TabsterTypes.RestorerTypes.Target;

  const restorerAttributes = getTabsterAttribute({ restorer: { type: restorerType } });

  return restorerAttributes;
}
