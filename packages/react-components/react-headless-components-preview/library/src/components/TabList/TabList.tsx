'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TabListProps } from './TabList.types';
import { useTabList } from './useTabList';
import { useTabListContextValues } from './useTabListContextValues';
import { renderTabList } from './renderTabList';

/**
 * A tab list component for organizing content.
 */
export const TabList: ForwardRefComponent<TabListProps> = React.forwardRef((props, ref) => {
  const state = useTabList(props, ref);
  const contextValues = useTabListContextValues(state);

  return renderTabList(state, contextValues);
});

TabList.displayName = 'TabList';
