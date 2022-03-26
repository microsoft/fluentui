import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Any value that identifies a specific tab.
 */
export type TabValue = unknown;

/**
 * A bounding rectangle of a tab
 */
export type TabContentRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TabSlots = {
  /**
   * Root of the component.
   */
  root: Slot<'button'>;

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

type TabCommons = {
  /**
   * A tab can be set to disable interaction.
   * @default false
   */
  disabled?: boolean;
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
  Omit<TabCommons, 'disabled'> &
  Required<Pick<TabCommons, 'disabled'>> & {
    /**
     * A tab supports 'transparent' and 'subtle' appearance.
     */
    appearance?: string;
    /**
     * A tab can have only an icon slot filled and no content.
     */
    iconOnly: boolean;
    /**
     * The current selected tab value.
     */
    selectedValue?: TabValue;
    /**
     * A tab can be either 'small' or 'medium' size.
     */
    size: 'small' | 'medium';
    /**
     * This tab's value;
     */
    value: TabValue;
    /**
     * A tab can arrange its content based on if the tabs in the list are arranged vertically.
     */
    vertical: boolean;
  };
