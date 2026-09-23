'use client';

import {
  useMergedTabsterAttributes_unstable,
  useTabsterAttributes,
  type TabsterDOMAttribute,
} from '@fluentui/react-tabster';

export type TabsterKeydownIgnoreKeys = {
  Escape?: boolean;
  Tab?: boolean;
};

/**
 * Hook to ignore keydown events for a given element when Tabster is enabled.
 * @internal
 */
export function useTabsterKeydownIgnore(props: unknown, ignoreKeydown: TabsterKeydownIgnoreKeys): TabsterDOMAttribute {
  const ignoreKeydownAttribute = useTabsterAttributes({
    focusable: { ignoreKeydown },
  });

  return useMergedTabsterAttributes_unstable(ignoreKeydownAttribute, typeof props === 'object' ? props : {});
}
