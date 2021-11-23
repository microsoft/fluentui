import * as React from 'react';
import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import { TabValue } from '../Tab/Tab.types';

export type SelectTabData = {
  value: TabValue;
};

export type SelectTabEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type SelectTabEventHandler = (event: SelectTabEvent, data: SelectTabData) => void;

export type TabListSlots = {
  /**
   * The slot associated with the root element of this tab list.
   */
  root: IntrinsicShorthandProps<'div'>;
};

export type TabListCommons = {
  /**
   * A tab list can supports 'transparent' and 'subtle' appearance.
   * - 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
   * - 'transparent': No background and border styling
   * The appearance affects each of the contained tabs.
   * @default 'transparent'
   */
  appearance?: 'transparent' | 'subtle';

  /**
   * Raised when a tab is selected.
   */
  onTabSelect?: SelectTabEventHandler;

  /**
   * The value of the currently selected tab.
   */
  selectedValue?: TabValue;

  /**
   * A tab list can be either 'small' or 'medium' size.
   * The size affects each of the contained tabs.
   * @default 'medium'
   */
  size?: 'small' | 'medium';

  /**
   * A tab list can arrange its tabs vertically.
   * @default false
   */
  vertical?: boolean;

  /**
   * A tab list can arrange the content within each tab vertically.
   * @default false
   */
  verticalTabContent?: boolean;
};

/**
 * TabList Props
 */
export type TabListProps = ComponentProps<TabListSlots> &
  TabListCommons & {
    /**
     * The value of the tab to be selected by default.
     * Typically useful when the selectedValue is uncontrolled.
     */
    defaultSelectedValue?: TabValue;
  };

type TabListStateContextCommons = TabListCommons &
  Required<Pick<TabListCommons, 'appearance' | 'size' | 'vertical' | 'verticalTabContent'>>;

export type TabListContextValue = TabListStateContextCommons & {
  /**
   * A callback to allow a tab to select itself when pressed.
   */
  onSelect: SelectTabEventHandler;
};

/**
 * Context values used in rendering TabList.
 */
export type TabListContextValues = {
  /**
   * The context of the tab list available to each tab.
   */
  tabList: TabListContextValue;
};

/**
 * State used in rendering TabList.
 */
export type TabListState = ComponentState<TabListSlots> & TabListStateContextCommons & TabListContextValue;
