'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTabList,
  useTabList,
  useTabListContextValues,
} from '@fluentui/react-headless-components-preview/tab-list';

import type { TabListProps, TabListState } from './TabList.types';
import { TabListContextProvider } from './TabListContext';
import { useTabListStyles } from './useTabListStyles';

/**
 * A TabList is a row of Tabs, one of which is selected. Windmod TabList: the headless tab list
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const TabList: ForwardRefComponent<TabListProps> = React.forwardRef((props, ref) => {
  const { appearance = 'transparent', reserveSelectedTabSpace = true, size = 'medium', ...rest } = props;

  const state: TabListState = {
    ...useTabList(rest, ref as React.Ref<HTMLElement>),
    appearance,
    reserveSelectedTabSpace,
    size,
  };

  const styled = useTabListStyles(state);
  // The Griffel context values are built from the styled state so that a Griffel Tab nested in a
  // windmod TabList receives the three look values too; the headless state omits all three.
  const contextValues = useTabListContextValues(styled);
  const { getRegisteredTabs } = styled;
  const tabContext = React.useMemo(
    () => ({ appearance, reserveSelectedTabSpace, size, getRegisteredTabs }),
    [appearance, reserveSelectedTabSpace, size, getRegisteredTabs],
  );

  return <TabListContextProvider value={tabContext}>{renderTabList(styled, contextValues)}</TabListContextProvider>;
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<TabListProps>;

TabList.displayName = 'TabList';
