// import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingBubbleActionsSlots = {
  /**
   * The element wrapping the buttons.
   */
  root: NonNullable<Slot<'div'>>;
};

export type TeachingBubbleActionsState = ComponentState<TeachingBubbleActionsSlots>;

export type TeachingBubbleActionsProps = ComponentProps<Partial<TeachingBubbleActionsSlots>>;
