import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TabValue } from '../Tab/Tab.types';

export type TabRegisterData = {
  /**
   * The value of the tab.
   */
  value: TabValue;

  /**
   * The reference to the tab HTML element.
   */
  ref: React.RefObject<HTMLElement>;
};

export type RegisterTabEventHandler = (data: TabRegisterData) => void;

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
  root: Slot<'div'>;
};

type TabListCommons = {
  /**
   * A tab list can supports 'transparent' and 'subtle' appearance.
   *- 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
   *- 'transparent': No background and border styling
   * The appearance affects each of the contained tabs.
   * @default 'transparent'
   */
  appearance?: 'transparent' | 'subtle';

  /**
   * A tab list can be set to disable interaction.
   * @default false
   */
  disabled?: boolean;

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
  Required<Pick<TabListCommons, 'appearance' | 'disabled' | 'size' | 'vertical'>> & {
    /** A callback to allow a tab to register itself with the tab list. */
    onRegister: RegisterTabEventHandler;

    /** A callback to allow a tab to unregister itself with the tab list. */
    onUnregister: RegisterTabEventHandler;
    /**
     * A callback to allow a tab to select itself when pressed.
     */
    onSelect: SelectTabEventHandler;
    /**
     * Gets the registered tab data along with current and previous selected values.
     */
    getRegisteredTabs: () => {
      selectedValue?: TabValue;
      previousSelectedValue?: TabValue;
      registeredTabs: Record<string, TabRegisterData>;
    };
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
export type TabListState = ComponentState<Required<TabListSlots>> & TabListContextValue;
