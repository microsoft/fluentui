'use client';

import {
  useMergedTabsterAttributes_unstable,
  useTabsterAttributes,
  type TabsterDOMAttribute,
} from '@fluentui/react-tabster';

type IgnoredKeys = {
  Escape?: boolean;
  Tab?: boolean;
};

/**
 * Hook to ignore keydown events for a given element when Tabster is enabled.
 * @internal
 */
export function useTabsterKeydownIgnore(props: unknown, ignoreKeydown: IgnoredKeys): TabsterDOMAttribute {
  const ignoreKeydownAttribute = useTabsterAttributes({
    focusable: { ignoreKeydown },
  });

  return useMergedTabsterAttributes_unstable(ignoreKeydownAttribute, typeof props === 'object' ? props : {});
}
