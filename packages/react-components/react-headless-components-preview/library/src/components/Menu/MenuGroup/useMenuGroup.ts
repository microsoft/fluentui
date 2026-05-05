'use client';

import type * as React from 'react';
import { useMenuGroup_unstable } from '@fluentui/react-menu';
import type { MenuGroupProps, MenuGroupState } from './MenuGroup.types';

/**
 * Returns the state for a MenuGroup.
 *
 * Delegates to v9's `useMenuGroup_unstable`. The v9 hook is already
 * tabster-/Griffel-free, so no separate Base variant exists. Pair the
 * returned state with `useMenuGroupContextValues` and pass both to
 * `renderMenuGroup` to scope a `headerId` for the optional `MenuGroupHeader`.
 */
export const useMenuGroup = (props: MenuGroupProps, ref: React.Ref<HTMLElement>): MenuGroupState => {
  return useMenuGroup_unstable(props, ref);
};
