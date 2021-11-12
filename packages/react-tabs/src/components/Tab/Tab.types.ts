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
  // Placeholder for contextual selection
  selected?: boolean;

  /**
   * The value that identifies this tab.
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
    appearance?: string;
    contentClassName?: string;
    size: 'small' | 'medium';
    verticalContent: boolean;
    verticalList: boolean;
  };
