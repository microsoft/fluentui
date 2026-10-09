'use client';

import * as React from 'react';
import type { TabListState as TabListHeadlessState } from '@fluentui/react-headless-components-preview/tab-list';

import type { TabListState } from './TabList.types';

/** Values a TabList publishes to the Tabs below it. */
export type TabListContextValue = Required<Pick<TabListState, 'appearance' | 'reserveSelectedTabSpace' | 'size'>> & {
  getRegisteredTabs?: TabListHeadlessState['getRegisteredTabs'];
};

const TabListContext = React.createContext<TabListContextValue | undefined>(undefined);

/** A Tab rendered outside any TabList falls back to the same values a bare TabList resolves. */
const tabListContextDefaultValue: TabListContextValue = {
  appearance: 'transparent',
  reserveSelectedTabSpace: true,
  size: 'medium',
};

export const TabListContextProvider = TabListContext.Provider;

/**
 * The headless surface exports the provider half of the Griffel tab list context but no reader,
 * so this module supplies one. It is internal — no barrel re-exports it.
 */
export const useTabListContext = (): TabListContextValue =>
  React.useContext(TabListContext) ?? tabListContextDefaultValue;
