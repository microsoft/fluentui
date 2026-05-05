'use client';

import * as React from 'react';
import type { TabListContextValue, TabListContextValues, TabListState } from './TabList.types';

export function useTabListContextValues_unstable(state: TabListState): TabListContextValues {
  const {
    appearance,
    reserveSelectedTabSpace,
    disabled,
    selectTabOnFocus,
    selectedValue: selectedKey,
    onRegister,
    onUnregister,
    onSelect,
    getRegisteredTabs,
    size,
    vertical,
  } = state;

  const tabList = React.useMemo<TabListContextValue>(
    () => ({
      appearance,
      reserveSelectedTabSpace,
      disabled,
      selectTabOnFocus,
      selectedValue: selectedKey,
      onSelect,
      onRegister,
      onUnregister,
      getRegisteredTabs,
      size,
      vertical,
    }),
    [
      appearance,
      reserveSelectedTabSpace,
      disabled,
      selectTabOnFocus,
      selectedKey,
      onSelect,
      onRegister,
      onUnregister,
      getRegisteredTabs,
      size,
      vertical,
    ],
  );

  return { tabList };
}
