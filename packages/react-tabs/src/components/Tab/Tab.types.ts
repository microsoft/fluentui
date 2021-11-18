import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

/**
 * Any value that identifies a specific tab.
 */
export type TabValue = unknown;

export type TabSlots = {
  /**
   * Root of the component.
   */
  root: IntrinsicShorthandProps<'div'>;

  /**
   * Container to layout tab content based on tab list context.
   */
  content: IntrinsicShorthandProps<'div'>;

  /**
   * Icon that renders before the content.
   */
  icon?: IntrinsicShorthandProps<'span'>;
};

export type TabCommons = {
  /**
   * The value that identifies this tab when selected.
   */
  value: TabValue;
};

/**
 * Tab Props
 */
export type TabProps = ComponentProps<TabSlots> & TabCommons;

/**
 * State used in rendering Tab
 */
export type TabState = ComponentState<TabSlots> &
  TabCommons & {
    /**
     * A tab supports 'transparent' and 'subtle' appearance.
     * Provided by TabList context.
     */
    appearance?: string;
    /**
     * If this tab is selected.
     * Calculated from TabList context selectedValue.
     */
    selected?: boolean;
    /**
     * A tab can be either 'small' or 'medium' size.
     * Provided by TabList context.
     */
    size: 'small' | 'medium';
    /**
     * A tab can arrange its content vertically.
     * Provided by TabList context verticalTabContent.
     */
    verticalContent: boolean;
    /**
     * A tab can arrange its content based on if the tabs in the list are arranged vertically.
     * Provided by TabList context vertical.
     */
    verticalList: boolean;
  };
