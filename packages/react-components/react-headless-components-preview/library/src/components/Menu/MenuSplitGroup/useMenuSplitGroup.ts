'use client';

import type * as React from 'react';
import { useMenuSplitGroup_unstable } from '@fluentui/react-menu';
import type { MenuSplitGroupProps, MenuSplitGroupState } from './MenuSplitGroup.types';

export const useMenuSplitGroup = (props: MenuSplitGroupProps, ref: React.Ref<HTMLElement>): MenuSplitGroupState => {
  return useMenuSplitGroup_unstable(props, ref);
};
