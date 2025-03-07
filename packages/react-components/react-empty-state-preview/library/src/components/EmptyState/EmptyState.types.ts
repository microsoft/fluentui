import type { Slot, ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type EmptyStateSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'div'>;

  /**
   * Element used to render the main header title.
   */
  header: Slot<'span'>;
};

export type EmptyStateProps = ComponentProps<EmptyStateSlots> & {
  /**
   * The title of the EmptyState.
   */
  title?: string;
};

export type EmptyStateState = ComponentState<EmptyStateSlots>;
