import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverActionsSlots = {
  /**
   * The element wrapping the buttons.
   */
  root: NonNullable<Slot<'div'>>;
};

export type TeachingPopoverActionsState = ComponentState<TeachingPopoverActionsSlots> & {
  totalPages: number;
};

export type TeachingPopoverActionsProps = ComponentProps<Partial<TeachingPopoverActionsSlots>>;
