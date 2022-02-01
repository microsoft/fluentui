import * as React from 'react';
import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';
import { TabValue } from '../Tab/Tab.types';

export type RegisterTabData = {
  /**
   * The value of the selected tab.
   */
  value: TabValue;

  ref: React.RefObject<HTMLElement>;
};

export type RegisterTabEventHandler = (data: RegisterTabData) => void;

export type SelectTabData = {
  /**
   * The value of the selected tab.
   */
  value: TabValue;
};

export type SelectTabEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type SelectTabEventHandler = (event: SelectTabEvent, data: SelectTabData) => void;

export type TabListSlots = {
  /**
   * The slot associated with the root element of this tab list.
   */
  root: IntrinsicSlotProps<'div'>;
};

export type TabListCommons = {
  /**
   * A tab list can supports 'transparent' and 'subtle' appearance.
   *- 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
   *- 'transparent': No background and border styling
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

export type TabListContextValue = Pick<TabListCommons, 'onTabSelect' | 'selectedValue'> &
  Required<Pick<TabListCommons, 'appearance' | 'size' | 'vertical'>> & {
    /** A callback to allow a tab to register itself with the tab list. */
    onRegister: RegisterTabEventHandler;

    /** A callback to allow a tab to unregister itself with the tab list. */
    onUnregister: RegisterTabEventHandler;
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
 * A bounding rectangle of a tab
 */
export type TabContentRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * State used in rendering TabList.
 */
export type TabListState = ComponentState<Required<TabListSlots>> &
  TabListContextValue & {
    selectedTabRect?: TabContentRect;
  };
