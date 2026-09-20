'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TabListProps } from './TabList.types';
import { renderTabList } from './renderTabList';
import { useTabList, useTabListContextValues } from './useTabList';
import { useTabListStyles } from './useTabListStyles.styles';

export const TabList: ForwardRefComponent<TabListProps> = React.forwardRef((props, ref) => {
  const state = useTabList(props, ref);
  const contextValues = useTabListContextValues(state);

  useTabListStyles(state);

  return renderTabList(state, contextValues);
});

TabList.displayName = 'TabList';
