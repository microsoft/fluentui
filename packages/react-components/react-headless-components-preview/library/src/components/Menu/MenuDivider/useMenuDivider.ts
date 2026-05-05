'use client';

import type * as React from 'react';
import { useMenuDivider_unstable } from '@fluentui/react-menu';
import type { MenuDividerProps, MenuDividerState } from './MenuDivider.types';

/**
 * Returns the state for a MenuDivider.
 *
 * Delegates to v9's `useMenuDivider_unstable`, which produces a
 * `role="presentation"` `aria-hidden` container suitable for visual
 * separators between MenuItem groups.
 */
export const useMenuDivider = (props: MenuDividerProps, ref: React.Ref<HTMLElement>): MenuDividerState => {
  return useMenuDivider_unstable(props, ref);
};
