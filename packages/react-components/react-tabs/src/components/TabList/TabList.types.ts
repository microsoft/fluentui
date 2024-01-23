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

export type SelectTabEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E> | React.FocusEvent<E>;

export type SelectTabEventHandler = (event: SelectTabEvent, data: SelectTabData) => void;

export type TabListSlots = {
  /**
   * The slot associated with the root element of this tab list.
   */
  root: Slot<'div'>;
};

/**
 * TabList Props
 */
export type TabListProps = ComponentProps<TabListSlots> & {
  /**
   * A tab list can supports 'transparent' and 'subtle' appearance.
   *- 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
   *- 'transparent': No background and border styling
   * The appearance affects each of the contained tabs.
   * @default 'transparent'
   */
  appearance?: 'transparent' | 'subtle';

  /**
   * Tab size may change between unselected and selected states.
   * The default scenario is a selected tab has bold text.
   *
   * When true, this property requests tabs be the same size whether unselected or selected.
   * @default true
   */
  reserveSelectedTabSpace?: boolean;

  /**
   * The value of the tab to be selected by default.
   * Typically useful when the selectedValue is uncontrolled.
   */
  defaultSelectedValue?: TabValue;

  /**
   * A tab list can be set to disable interaction.
   * @default false
   */
  disabled?: boolean;

  /**
   * Raised when a tab is selected.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onTabSelect?: SelectTabEventHandler;

  /**
   * When true, focusing a tab will select it.
   * @default false
   */
  selectTabOnFocus?: boolean;

  /**
   * The value of the currently selected tab.
   */
  selectedValue?: TabValue;

  /**
   * A tab list can be either 'small', 'medium', or 'large' size.
   * The size affects each of the contained tabs.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * A tab list can arrange its tabs vertically.
   * @default false
   */
  vertical?: boolean;
};

export type TabListContextValue = Pick<
  TabListProps,
  'onTabSelect' | 'selectTabOnFocus' | 'selectedValue' | 'reserveSelectedTabSpace'
> &
  Required<Pick<TabListProps, 'appearance' | 'disabled' | 'size' | 'vertical'>> & {
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
