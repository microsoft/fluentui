import { getTabsterAttribute, Types as TabsterTypes, TABSTER_ATTRIBUTE_NAME } from 'tabster';
import { useTabster } from './useTabster';
import * as React from 'react';

/**
 * @internal
 * Hook that returns tabster attributes while ensuring tabster exists
 */
export const useTabsterAttributes = (props: TabsterTypes.TabsterAttributeProps): TabsterTypes.TabsterDOMAttribute => {
  // A tabster instance is not necessary to generate tabster attributes
  // but calling the hook will ensure that a tabster instance exists internally and avoids consumers doing the same
  useTabster();

  const strAttr = getTabsterAttribute(props, true);

  return React.useMemo(
    () => ({
      [TABSTER_ATTRIBUTE_NAME]: strAttr,
    }),
    [strAttr],
  );
};
