'use client';

import type * as React from 'react';
import { useMenuGroupHeader_unstable } from '@fluentui/react-menu';
import type { MenuGroupHeaderProps, MenuGroupHeaderState } from './MenuGroupHeader.types';

/**
 * Returns the state for a MenuGroupHeader.
 *
 * Delegates to v9's `useMenuGroupHeader_unstable`, which reads the parent
 * MenuGroup's `headerId` from context and stamps it on the rendered root.
 */
export const useMenuGroupHeader = (props: MenuGroupHeaderProps, ref: React.Ref<HTMLElement>): MenuGroupHeaderState => {
  return useMenuGroupHeader_unstable(props, ref);
};
