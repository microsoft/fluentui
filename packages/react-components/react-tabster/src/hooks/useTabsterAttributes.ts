import * as React from 'react';
import { getTabsterAttribute, Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

/**
 * @internal
 * Hook that returns tabster attributes while ensuring tabster exists
 */
export const useTabsterAttributes = (props: TabsterTypes.TabsterAttributeProps): TabsterTypes.TabsterDOMAttribute => {
  const getTabster = useTabster();

  React.useEffect(() => {
    // A tabster instance is not necessary to generate tabster attributes
    // but calling the hook will ensure that a tabster instance exists internally and avoids consumers doing the same
    getTabster();
  }, [getTabster]);

  return getTabsterAttribute(props);
};
