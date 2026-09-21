'use client';

import * as React from 'react';
import type { MenuSplitGroupState } from '@fluentui/react-menu';

/**
 * Context values shared with the descendants of a MenuSplitGroup.
 *
 * Mirrors `@fluentui/react-menu`'s `MenuSplitGroupContextValues`, which that package does not
 * export from its public API.
 */
export type MenuSplitGroupContextValues = {
  menuSplitGroup: {
    setMultiline: (multiline: boolean) => void;
  };
};

/**
 * Builds the context value shared with the descendants of a MenuSplitGroup.
 *
 * `useIsInMenuSplitGroup` compares the provided value against the module-level default by
 * identity, so providing one is what lets a descendant tell it is inside a split group. The memo
 * keeps that identity stable across renders; `setMultiline` stays the documented no-op.
 */
export const useMenuSplitGroupContextValues = (state: MenuSplitGroupState): MenuSplitGroupContextValues => {
  const { setMultiline } = state;

  const menuSplitGroup = React.useMemo(() => ({ setMultiline }), [setMultiline]);

  return { menuSplitGroup };
};
