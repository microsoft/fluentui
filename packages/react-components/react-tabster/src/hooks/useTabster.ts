import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { createTabster, disposeTabster, Types as TabsterTypes } from 'tabster';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

/**
 * Returns a factory for tabster instance. The factory should only be used
 * in effects or event callbacks. **Do not invoke the factory at render time, it can break in strict mode.**
 *
 * @internal
 * @returns Tabster core instance
 */
export const useTabster = (): (() => TabsterTypes.TabsterCore | null) => {
  const { targetDocument } = useFluent();
  const tabsterInstanceRef = React.useRef<TabsterTypes.TabsterCore | null>(null);

  useIsomorphicLayoutEffect(() => {
    return () => {
      if (tabsterInstanceRef.current) {
        disposeTabster(tabsterInstanceRef.current);
      }
    };
  }, [targetDocument]);

  return React.useCallback(() => {
    const defaultView = targetDocument?.defaultView || undefined;
    if (!defaultView || tabsterInstanceRef.current) {
      return tabsterInstanceRef.current;
    }

    tabsterInstanceRef.current = createTabster(defaultView, { autoRoot: {}, controlTab: false });
    return tabsterInstanceRef.current;
  }, [targetDocument]);
};
