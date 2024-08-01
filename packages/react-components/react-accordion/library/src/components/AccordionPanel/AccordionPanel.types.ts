import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AccordionPanelSlots = {
  root: NonNullable<Slot<'div'>>;
  collapseMotion?: Slot<PresenceMotionSlotProps>;
};

export type AccordionPanelProps = ComponentProps<AccordionPanelSlots>;

export type AccordionPanelState = ComponentState<AccordionPanelSlots> & {
  /**
   * Internal open state, provided by context.
   */
  open: boolean;
};
