'use client';

import type { Types as TabsterTypes } from 'tabster';
import * as tabsterModule from 'tabster';
import { useTabster } from './useTabster';
import * as React from 'react';

const tabster = (tabsterModule as typeof tabsterModule & { default?: typeof tabsterModule }).default ?? tabsterModule;
const { getTabsterAttribute, TABSTER_ATTRIBUTE_NAME } = tabster;

/**
 * Hook that returns tabster attributes while ensuring tabster exists
 *
 * @internal
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
