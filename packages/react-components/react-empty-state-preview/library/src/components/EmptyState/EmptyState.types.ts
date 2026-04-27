import type { Slot } from '@fluentui/react-utilities';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities/src/index';

export type EmptyStateSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'div'>;

  /**
   * Element used to render the main header title.
   */
  title: Slot<'span'>;
};

export type EmptyStateProps = ComponentProps<EmptyStateSlots>;

export type EmptyStateState = ComponentState<EmptyStateSlots>;
