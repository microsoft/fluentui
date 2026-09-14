'use client';

import {
  useMergedTabsterAttributes_unstable,
  useTabsterAttributes,
  type TabsterDOMAttribute,
} from '@fluentui/react-tabster';

/**
 * Hook to ignore Escape keydown events for a given element when Tabster is enabled.
 * @internal
 */
export function useTabsterEscapeIgnore(props: unknown, shouldIgnoreEscape: boolean): TabsterDOMAttribute {
  const ignoreEscapeKeyAttribute = useTabsterAttributes({
    focusable: {
      ignoreKeydown: { Escape: shouldIgnoreEscape },
    },
  });

  return useMergedTabsterAttributes_unstable(ignoreEscapeKeyAttribute, typeof props === 'object' ? props : {});
}
