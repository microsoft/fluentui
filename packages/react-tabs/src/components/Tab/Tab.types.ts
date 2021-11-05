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
   * Visual indicator that a tab is selected or a candidate for selection.
   */
  selectionIndicator: IntrinsicShorthandProps<'div'>;

  /**
   * Container for the content of the tab.
   */
  wrapper: IntrinsicShorthandProps<'div'>;
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
export type TabState = ComponentState<TabSlots> & TabCommons;
