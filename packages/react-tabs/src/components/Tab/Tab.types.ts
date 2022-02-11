import type { ComponentProps, ComponentState, ComponentRender, Slot } from '@fluentui/react-utilities';

/**
 * Any value that identifies a specific tab.
 */
export type TabValue = unknown;

export type TabSlots = {
  /**
   * Root of the component.
   */
  root: Slot<'div'>;

  /**
   * Icon that renders before the content.
   */
  icon?: Slot<'span'>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible.
   */
  content: NonNullable<Slot<'span'>>;
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
export type TabProps = ComponentProps<Partial<TabSlots>> & TabCommons;

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

export type TabRender = ComponentRender<TabState>;
