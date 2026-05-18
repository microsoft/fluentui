'use client';

import type * as React from 'react';
import { useMenuGroup_unstable } from '@fluentui/react-menu';
import type { MenuGroupProps, MenuGroupState } from '@fluentui/react-menu';

/**
 * Returns the state for a MenuGroup.
 *
 */
export const useMenuGroup = (props: MenuGroupProps, ref: React.Ref<HTMLElement>): MenuGroupState => {
  return useMenuGroup_unstable(props, ref);
};
