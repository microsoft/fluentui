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
   * Icon that renders before the content.
   */
  icon?: IntrinsicShorthandProps<'span'>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible.
   */
  content: IntrinsicShorthandProps<'span'>;
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
     */
    appearance?: string;
    /**
     * If this tab is selected.
     */
    selected?: boolean;
    /**
     * A tab can be either 'small' or 'medium' size.
     */
    size: 'small' | 'medium';
    /**
     * A tab can arrange its content based on if the tabs in the list are arranged vertically.
     */
    vertical: boolean;
  };
