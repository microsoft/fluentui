import * as React from 'react';
import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import { TabValue } from '../Tab/Tab.types';

export type SelectTabData = {
  value: TabValue;
};

export type SelectTabEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type SelectTabEventHandler = (event: SelectTabEvent, data: SelectTabData) => void;

export type TabListSlots = {
  // TODO Add slots here and to tabListShorthandProps in useTabList.ts
  root: IntrinsicShorthandProps<'div'>;
};

export type TabListCommons = {
  appearance?: 'transparent' | 'subtle';
  onTabSelected?: SelectTabEventHandler;
  selectedKey?: TabValue;
  size?: 'small' | 'medium';
  vertical?: boolean;
  verticalTabContent?: boolean;
};

/**
 * TabList Props
 */
export type TabListProps = ComponentProps<TabListSlots> &
  TabListCommons & {
    defaultSelectedKey?: TabValue;
  };

type TabListStateContextCommons = TabListCommons &
  Required<Pick<TabListCommons, 'appearance' | 'size' | 'vertical' | 'verticalTabContent'>>;

export type TabListContextValue = TabListStateContextCommons & {
  selectTab: SelectTabEventHandler;
};

export type TabListContextValues = {
  tabList: TabListContextValue;
};

/**
 * State used in rendering TabList
 */
export type TabListState = ComponentState<TabListSlots> & TabListStateContextCommons & TabListContextValue;
