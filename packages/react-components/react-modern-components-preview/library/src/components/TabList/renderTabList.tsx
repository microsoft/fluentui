import * as React from 'react';
import { renderTabList as renderTabListBase } from '@fluentui/react-headless-components-preview/tab-list';
import type { useTabListContextValues } from '@fluentui/react-headless-components-preview/tab-list';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TabListState } from './TabList.types';
import { TabListVisualContext } from './TabListContext';

export const renderTabList = (
  state: TabListState,
  contextValues: ReturnType<typeof useTabListContextValues>,
): JSXElement => {
  const { appearance, getRegisteredTabs, reserveSelectedTabSpace, size } = state;

  return (
    <TabListVisualContext.Provider value={{ appearance, getRegisteredTabs, reserveSelectedTabSpace, size }}>
      {renderTabListBase(state, contextValues)}
    </TabListVisualContext.Provider>
  );
};
